import { Response, NextFunction } from 'express';
import { CaseService } from '../services/caseService';
import { AuthenticatedRequest } from '../types';

export class CaseController {
  static async getCases(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user!;
      // Admin and investigator see all; clients see their own cases
      const clientId = user.role === 'client' ? user.id : undefined;
      const cases = await CaseService.getAllCases(clientId);

      res.status(200).json({
        success: true,
        data: { cases }
      });
    } catch (error: any) {
      next(error);
    }
  }

  static async getCaseById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const caseId = req.params.id as string;
      const caseItem = await CaseService.getCaseById(caseId);
      if (!caseItem) {
        res.status(404).json({ success: false, error: 'Case not found' });
        return;
      }

      // Check client authorization
      if (req.user!.role === 'client' && caseItem.client_id !== req.user!.id) {
        res.status(403).json({ success: false, error: 'Access to this case is restricted' });
        return;
      }

      res.status(200).json({
        success: true,
        data: { case: caseItem }
      });
    } catch (error: any) {
      next(error);
    }
  }

  static async createCase(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const newCase = await CaseService.createCase(req.user!.id, req.body);
      res.status(201).json({
        success: true,
        message: 'Investigation case initialized successfully.',
        data: { case: newCase }
      });
    } catch (error: any) {
      next(error);
    }
  }

  static async updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const caseId = req.params.id as string;
      const updatedCase = await CaseService.updateCaseStatus(caseId, req.body);
      if (!updatedCase) {
        res.status(404).json({ success: false, error: 'Case not found' });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Case status updated successfully.',
        data: { case: updatedCase }
      });
    } catch (error: any) {
      next(error);
    }
  }
}
