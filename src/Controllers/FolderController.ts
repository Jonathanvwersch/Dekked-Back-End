import express from 'express';
import FolderModel, { getFoldersByUser } from '../Persistance/FolderModel';
import { getUserIdFromRequest } from '../utils/passport/authHelpers';
import FolderService from '../Services/FolderService';
import FileTreeService from '../Services/FileTreeService';
export class FolderController {
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

  public async createFolder(req: express.Request, res: express.Response) {
    try {
      const { name, color, id } = req.body;
      const userId = getUserIdFromRequest(req);
      const folder = await FolderModel.createFolder(name, userId, color, id);
      const folders = await getFoldersByUser(userId);
      const fileTree = await FileTreeService.createFullFileTree(userId);

      res.status(200).json({
        success: true,
        folder,
        folders,
        fileTree
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false, error: e.message });
    }
  }

  public async updateFolder(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { name, color, folder_id } = req.body;
    try {
      const folders = await FolderService.updateFolder({
        name,
        color,
        folder_id,
        owner_id: userId
      });
      return res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async deleteFolder(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { folder_id } = req.body;
    try {
      await FolderService.deleteFolder(folder_id, userId);
      return res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}
