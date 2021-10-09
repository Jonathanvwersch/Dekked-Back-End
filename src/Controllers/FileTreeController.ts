import express, { NextFunction } from "express";
import FileTreeService from "../Services/FileTreeService";
import { getUserIdFromRequest } from "../utils";

export class FileTreeController {
  public async getFileTree(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const fileTree = await FileTreeService.createFullFileTree(userId);

    return res.status(200).json({
      ...fileTree,
    });
  }
}
