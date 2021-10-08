import express, { NextFunction } from "express";
import FolderModel from "../Persistance/FolderModel";
import { getUserIdFromRequest } from "../utils";
import FolderService from "../Services/FolderService";
export class FolderController {
  public async getFolders(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const folders = await FolderService.getFolderObject(userId);
    return res.status(200).json({ ...folders });
  }

  public async createFolder(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const { name, color, id } = req.body;
    const userId = getUserIdFromRequest(req);
    const folder = await FolderModel.createFolder(name, userId, color, id);

    return res.status(200).json({ ...folder });
  }

  public async updateFolder(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { name, color, folder_id } = req.body;

    const folder = await FolderModel.updateFolder({
      name,
      color,
      folder_id,
      owner_id: userId,
    });

    return res.status(200).json({ ...folder });
  }

  public async deleteFolder(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { folder_id } = req.body;

    const folder = await FolderService.deleteFolder(folder_id, userId);
    return res.status(200).json({ ...folder });
  }
}
