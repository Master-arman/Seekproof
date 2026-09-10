import { Request, Response, NextFunction } from 'express';
import { InquiryService } from '../services/inquiryService';

export class InquiryController {
  static async createInquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const ip = req.ip || req.socket.remoteAddress;
      const inquiry = await InquiryService.createInquiry(req.body, ip);

      res.status(201).json({
        success: true,
        message: 'Your inquiry has been encrypted and submitted securely. A Senior Investigator will review it confidentially.',
        data: { inquiry }
      });
    } catch (error: any) {
      next(error);
    }
  }

  static async getInquiries(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const inquiries = await InquiryService.getAllInquiries();
      res.status(200).json({
        success: true,
        data: { inquiries }
      });
    } catch (error: any) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const inquiryId = req.params.id as string;
      const inquiry = await InquiryService.updateInquiryStatus(inquiryId, req.body);
      if (!inquiry) {
        res.status(404).json({ success: false, error: 'Inquiry not found' });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Inquiry status updated successfully.',
        data: { inquiry }
      });
    } catch (error: any) {
      next(error);
    }
  }
}
