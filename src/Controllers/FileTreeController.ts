import express from 'express';
import FileTreeService from '../Services/FileTreeService';
import { getUserIdFromRequest } from '../utils/passport/authHelpers';

export class FileTreeController {
  public async getFileTree(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);

    try {
      const fileTree = await FileTreeService.createFullFileTree(userId);
      return res.status(200).json({
        success: true,
        data: { fileTree }
      });
    } catch (e) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }
}
