import express, { NextFunction } from "express";
import { getBinders, getStudySetsByUserId } from "../Persistance";
import { createBinderObject, createStudySetObject } from "../Services";
import FileTreeService from "../Services/FileTreeService";
import FolderService from "../Services/FolderService";
import { getUserIdFromRequest } from "../utils";

export class FileController {
  public async getFiles(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const fileTree = await FileTreeService.createFullFileTree(userId);

    const binders = await getBinders(userId);
    const binderObject = createBinderObject(binders);

    const folders = await FolderService.getFolderObject(userId);

    const studySets = await getStudySetsByUserId(userId);
    const studySetObject = createStudySetObject(studySets);

    return res.status(200).json({
      fileTree,
      binders: binderObject,
      folders,
      studySets: studySetObject,
    });
  }
}
