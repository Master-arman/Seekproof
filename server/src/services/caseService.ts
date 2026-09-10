import db from '../database/db';
import { Case, CaseStatus } from '../types';
import { CreateCaseInput, UpdateCaseStatusInput } from '../validators/caseValidators';

const fallbackCases: Case[] = [
  {
    id: 'cas_908123',
    case_number: 'SP-2026-0891',
    title: 'Operation Obsidian: Corporate IP Leak Investigation',
    description: 'Forensic digital footprinting and physical counter-surveillance regarding unauthorized proprietary algorithmic blueprint dissemination.',
    case_type: 'corporate_fraud',
    status: 'evidence_gathering',
    priority: 'critical',
    client_id: 'usr_demo_client_002',
    progress_percentage: 65,
    confidentiality_level: 'top_secret',
    target_subject: 'Confidential Tech Competitor Entity',
    location: 'Zurich / London',
    created_at: new Date('2026-02-15'),
  },
  {
    id: 'cas_908124',
    case_number: 'SP-2026-0904',
    title: 'High-Value Asset Tracing & Offshore Recovery',
    description: 'Multi-jurisdictional financial audit, shell company de-anonymization, and physical asset location verification.',
    case_type: 'asset_recovery',
    status: 'active_investigation',
    priority: 'urgent',
    client_id: 'usr_demo_client_002',
    progress_percentage: 40,
    confidentiality_level: 'secret',
    target_subject: 'Holding Trust Assets',
    location: 'Cayman Islands / Dubai',
    created_at: new Date('2026-03-01'),
  },
  {
    id: 'cas_908125',
    case_number: 'SP-2026-0740',
    title: 'C-Suite Executive Pre-Acquisition Vetting',
    description: 'Comprehensive deep-web background intelligence, conflict-of-interest analysis, and reputational risk report.',
    case_type: 'background_intelligence',
    status: 'closed',
    priority: 'standard',
    client_id: 'usr_demo_client_002',
    progress_percentage: 100,
    confidentiality_level: 'confidential',
    target_subject: 'Target Executive',
    location: 'New York, NY',
    created_at: new Date('2026-01-10'),
  }
];

export class CaseService {
  static async getAllCases(clientId?: string): Promise<Case[]> {
    if (db.isConnected()) {
      try {
        let sql = 'SELECT * FROM cases';
        const params: any[] = [];
        if (clientId) {
          sql += ' WHERE client_id = ?';
          params.push(clientId);
        }
        sql += ' ORDER BY created_at DESC';
        const rows = await db.query<Case[]>(sql, params);
        if (rows && rows.length > 0) return rows;
      } catch (err: any) {
        console.warn('MySQL case query fallback:', err.message);
      }
    }

    if (clientId) {
      return fallbackCases.filter((c) => c.client_id === clientId);
    }
    return fallbackCases;
  }

  static async getCaseById(id: string): Promise<Case | null> {
    if (db.isConnected()) {
      try {
        const rows = await db.query<Case[]>('SELECT * FROM cases WHERE id = ? OR case_number = ? LIMIT 1', [id, id]);
        if (rows && rows.length > 0) return rows[0];
      } catch (e) {}
    }

    return fallbackCases.find((c) => c.id === id || c.case_number === id) || null;
  }

  static async createCase(clientId: string, input: CreateCaseInput): Promise<Case> {
    const caseId = `cas_${Date.now()}`;
    const caseNumber = `SP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCase: Case = {
      id: caseId,
      case_number: caseNumber,
      title: input.title,
      description: input.description,
      case_type: input.case_type,
      status: 'under_review',
      priority: input.priority,
      confidentiality_level: input.confidentiality_level,
      client_id: clientId,
      progress_percentage: 10,
      target_subject: input.target_subject,
      location: input.location,
      created_at: new Date(),
    };

    if (db.isConnected()) {
      try {
        await db.query(
          `INSERT INTO cases (id, case_number, title, description, case_type, status, priority, confidentiality_level, client_id, progress_percentage, target_subject, location)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            newCase.id,
            newCase.case_number,
            newCase.title,
            newCase.description,
            newCase.case_type,
            newCase.status,
            newCase.priority,
            newCase.confidentiality_level,
            newCase.client_id,
            newCase.progress_percentage,
            newCase.target_subject || null,
            newCase.location || null
          ]
        );
      } catch (err: any) {
        console.warn('MySQL case create fallback:', err.message);
        fallbackCases.unshift(newCase);
      }
    } else {
      fallbackCases.unshift(newCase);
    }

    return newCase;
  }

  static async updateCaseStatus(id: string, input: UpdateCaseStatusInput): Promise<Case | null> {
    const existing = await this.getCaseById(id);
    if (!existing) return null;

    const updated = {
      ...existing,
      status: input.status,
      progress_percentage: input.progress_percentage !== undefined ? input.progress_percentage : existing.progress_percentage,
      lead_investigator_id: input.lead_investigator_id || existing.lead_investigator_id,
      updated_at: new Date()
    };

    if (db.isConnected()) {
      try {
        await db.query(
          'UPDATE cases SET status = ?, progress_percentage = ?, lead_investigator_id = ? WHERE id = ?',
          [updated.status, updated.progress_percentage, updated.lead_investigator_id || null, id]
        );
      } catch (e) {}
    }

    const index = fallbackCases.findIndex(c => c.id === id);
    if (index !== -1) {
      fallbackCases[index] = updated;
    }

    return updated;
  }
}
