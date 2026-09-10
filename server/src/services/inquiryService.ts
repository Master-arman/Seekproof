import db from '../database/db';
import { Inquiry } from '../types';
import { CreateInquiryInput, UpdateInquiryStatusInput } from '../validators/inquiryValidators';

const fallbackInquiries: Inquiry[] = [
  {
    id: 'inq_001',
    name: 'Marcus Sterling',
    email: 'm.sterling@globalholdings.ch',
    phone: '+41 22 555 0122',
    case_type: 'corporate_fraud',
    service_requested: 'Corporate Espionage & Whistleblower Analysis',
    description: 'We require an urgent internal digital forensics analysis regarding suspicious exfiltration of proprietary research files.',
    urgency: 'immediate_threat',
    status: 'reviewed',
    created_at: new Date('2026-03-05'),
  },
  {
    id: 'inq_002',
    name: 'Victoria Hawthorne',
    email: 'vhawthorne@legalconsult.co.uk',
    phone: '+44 20 7946 0912',
    case_type: 'asset_recovery',
    service_requested: 'Cross-Border Asset & Entity Tracing',
    description: 'Seeking assistance in verifying beneficial ownership of several offshore LLCs involved in a pending civil judgment.',
    urgency: 'time_sensitive',
    status: 'pending',
    created_at: new Date('2026-03-08'),
  }
];

export class InquiryService {
  static async createInquiry(input: CreateInquiryInput, ip?: string): Promise<Inquiry> {
    const inquiryId = `inq_${Date.now()}`;
    const newInquiry: Inquiry = {
      id: inquiryId,
      name: input.name,
      email: input.email,
      phone: input.phone,
      case_type: input.case_type,
      service_requested: input.service_requested,
      description: input.description,
      urgency: input.urgency,
      status: 'pending',
      created_at: new Date(),
    };

    if (db.isConnected()) {
      try {
        await db.query(
          `INSERT INTO inquiries (id, name, email, phone, case_type, service_requested, description, urgency, status, ip_address)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            newInquiry.id,
            newInquiry.name,
            newInquiry.email,
            newInquiry.phone,
            newInquiry.case_type,
            newInquiry.service_requested,
            newInquiry.description,
            newInquiry.urgency,
            newInquiry.status,
            ip || null
          ]
        );
      } catch (err: any) {
        console.warn('MySQL inquiry create fallback:', err.message);
        fallbackInquiries.unshift(newInquiry);
      }
    } else {
      fallbackInquiries.unshift(newInquiry);
    }

    return newInquiry;
  }

  static async getAllInquiries(): Promise<Inquiry[]> {
    if (db.isConnected()) {
      try {
        const rows = await db.query<Inquiry[]>('SELECT * FROM inquiries ORDER BY created_at DESC');
        if (rows && rows.length > 0) return rows;
      } catch (e) {}
    }
    return fallbackInquiries;
  }

  static async updateInquiryStatus(id: string, input: UpdateInquiryStatusInput): Promise<Inquiry | null> {
    if (db.isConnected()) {
      try {
        await db.query('UPDATE inquiries SET status = ? WHERE id = ?', [input.status, id]);
      } catch (e) {}
    }

    const inquiry = fallbackInquiries.find(i => i.id === id);
    if (inquiry) {
      inquiry.status = input.status;
      return inquiry;
    }
    return null;
  }
}
