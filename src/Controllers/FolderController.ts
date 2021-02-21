import express from 'express';
import FolderModel from '../Persistance/FolderModel';
import { getUserIdFromRequest } from '../utils/passport/authHelpers';
import FolderService from '../Services/FolderService';
export class FolderController {
  public async createFolder(req: express.Request, res: express.Response) {
    const userId = getUserIdFromRequest(req);
    try {
      console.log('CREAATING FOLDER');
      const { name, color } = req.body;
      const response = await FolderModel.createFolder(name, userId, color);
      console.log(response);
      res.status(200).json({
        success: true,
        data: response
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false, error: e.message });
    }
  }

  public async getFolders(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    try {
      const folders = await FolderService.getFolderObject(userId);
      return res.status(200).json({ success: true, data: { folders } });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  // public async deleteFolder(
  //   req: express.Request,
  //   res: express.Response
  // ): Promise<express.Response<any>> {
  //   const userId = getUserIdFromRequest(req);

  //   try {
  //     if (!req.body.folder_id)
  //       return res.status(400).json({ success: false, error: 'Folder_id not found' });
  //     const deleteResponse = await FolderModel.deleteAllChildren(req.body.folder_id, userId);
  //     if (deleteResponse.length) return res.status(200).json({ success: true });

  //     return res.status(500).json({ success: false, error: 'Error deleting' });
  //   } catch (e) {
  //     return res.status(500).json({ success: false, error: e.message });
  //   }
  // }
}
