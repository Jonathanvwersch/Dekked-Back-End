import express from "express";
import FileTreeService from "../Services/FileTreeService";
import { getUserIdFromRequest, ErrorHandler } from "../utils";

export class FileTreeController {
  public async getFileTree(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);

    try {
      const fileTree = await FileTreeService.createFullFileTree(userId);
      return res.status(200).json({
        ...fileTree,
      });
    } catch (e) {
      throw new ErrorHandler(e.status, e.message);
    }
  }
}
