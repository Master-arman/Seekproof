import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import db from '../database/db';
import { User, UserRole } from '../types';
import { RegisterInput, LoginInput } from '../validators/authValidators';

// In-memory fallback user store for zero-friction setup, tests & demo accounts
const fallbackUsers: Map<string, User & { password_hash: string }> = new Map([
  [
    'superadmin@seekproof.com',
    {
      id: 'usr_super_admin_001',
      name: 'Director Alexander Cross (Chief Executive)',
      email: 'superadmin@seekproof.com',
      password_hash: bcrypt.hashSync('Investigate2026!', 10),
      phone: '+1 (800) 555-0100',
      role: 'super_admin',
      is_active: true,
      agency_tier: 'vip_corporate',
      created_at: new Date('2024-01-01'),
      last_login_at: new Date(),
    }
  ],
  [
    'manager@seekproof.com',
    {
      id: 'usr_manager_002',
      name: 'Commander Marcus Vance (Operations Manager)',
      email: 'manager@seekproof.com',
      password_hash: bcrypt.hashSync('Investigate2026!', 10),
      phone: '+1 (800) 555-0199',
      role: 'manager',
      is_active: true,
      agency_tier: 'vip_corporate',
      created_at: new Date('2024-02-15'),
      last_login_at: new Date(),
    }
  ],
  [
    'staff@seekproof.com',
    {
      id: 'usr_staff_003',
      name: 'Agent Sarah Jenkins (Intelligence Staff)',
      email: 'staff@seekproof.com',
      password_hash: bcrypt.hashSync('Investigate2026!', 10),
      phone: '+1 (800) 555-0177',
      role: 'staff',
      is_active: true,
      agency_tier: 'standard',
      created_at: new Date('2024-06-10'),
      last_login_at: new Date(),
    }
  ],
  [
    'demo@seekproof.com',
    {
      id: 'usr_demo_admin_001',
      name: 'Agent V. Vance (Chief Investigator)',
      email: 'demo@seekproof.com',
      password_hash: bcrypt.hashSync('Investigate2026!', 10),
      phone: '+1 (800) 555-0199',
      role: 'admin',
      is_active: true,
      agency_tier: 'vip_corporate',
      created_at: new Date(),
      last_login_at: new Date(),
    }
  ],
  [
    'client@seekproof.com',
    {
      id: 'usr_demo_client_002',
      name: 'Eleanor Sterling',
      email: 'client@seekproof.com',
      password_hash: bcrypt.hashSync('ClientPass2026!', 10),
      phone: '+1 (800) 555-0188',
      role: 'client',
      is_active: true,
      agency_tier: 'priority',
      created_at: new Date(),
      last_login_at: new Date(),
    }
  ]
]);

export class AuthService {
  static async register(input: RegisterInput): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const existing = await this.findByEmail(input.email);
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(input.password, salt);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newUser: User = {
      id: userId,
      name: input.name,
      email: input.email.toLowerCase(),
      phone: input.phone || '',
      role: input.role || 'client',
      is_active: true,
      agency_tier: input.agency_tier || 'standard',
      created_at: new Date(),
      last_login_at: new Date(),
    };

    if (db.isConnected()) {
      try {
        await db.query(
          `INSERT INTO users (id, name, email, password_hash, phone, role, is_active, agency_tier)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [newUser.id, newUser.name, newUser.email, passwordHash, newUser.phone, newUser.role, 1, newUser.agency_tier]
        );
      } catch (err: any) {
        console.warn('MySQL write error, falling back to local store:', err.message);
        fallbackUsers.set(newUser.email, { ...newUser, password_hash: passwordHash });
      }
    } else {
      fallbackUsers.set(newUser.email, { ...newUser, password_hash: passwordHash });
    }

    const token = this.generateToken(newUser);
    return { user: newUser, token };
  }

  static async login(input: LoginInput): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const userRecord = await this.findByEmailWithPassword(input.email);
    if (!userRecord) {
      throw new Error('Invalid email or password credentials.');
    }

    if (userRecord.is_active === false) {
      throw new Error('Account suspended or deactivated. Contact administrative security.');
    }

    const isMatch = await bcrypt.compare(input.password, userRecord.password_hash);
    if (!isMatch) {
      throw new Error('Invalid email or password credentials.');
    }

    // Update last login timestamp
    userRecord.last_login_at = new Date();
    if (db.isConnected()) {
      try {
        await db.query('UPDATE users SET last_login_at = NOW() WHERE email = ?', [userRecord.email]);
      } catch (e) {
        // silent
      }
    }

    const { password_hash, ...safeUser } = userRecord;
    const token = this.generateToken(safeUser);

    return { user: safeUser, token };
  }

  static async findByEmail(email: string): Promise<User | null> {
    const user = await this.findByEmailWithPassword(email);
    if (!user) return null;
    const { password_hash, ...safeUser } = user;
    return safeUser;
  }

  static async findById(id: string): Promise<User | null> {
    if (db.isConnected()) {
      try {
        const rows = await db.query<any[]>(
          'SELECT id, name, email, phone, role, is_active, last_login_at, agency_tier, created_at FROM users WHERE id = ? LIMIT 1',
          [id]
        );
        if (rows && rows.length > 0) {
          return {
            ...rows[0],
            is_active: Boolean(rows[0].is_active ?? true),
          } as User;
        }
      } catch (e) {
        // Fallback to memory
      }
    }

    for (const user of fallbackUsers.values()) {
      if (user.id === id) {
        const { password_hash, ...safeUser } = user;
        return safeUser;
      }
    }
    return null;
  }

  private static async findByEmailWithPassword(email: string): Promise<(User & { password_hash: string }) | null> {
    const normalizedEmail = email.toLowerCase().trim();

    if (db.isConnected()) {
      try {
        const rows = await db.query<any[]>(
          'SELECT id, name, email, password_hash, phone, role, is_active, last_login_at, agency_tier, created_at FROM users WHERE email = ? LIMIT 1',
          [normalizedEmail]
        );
        if (rows && rows.length > 0) {
          return {
            ...rows[0],
            is_active: Boolean(rows[0].is_active ?? true),
          };
        }
      } catch (e) {
        // Continue to fallback
      }
    }

    return fallbackUsers.get(normalizedEmail) || null;
  }

  private static generateToken(user: User): string {
    const secret: jwt.Secret = config.jwt.secret;
    const options: jwt.SignOptions = { expiresIn: config.jwt.expiresIn as any };

    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      secret,
      options
    );
  }
}
