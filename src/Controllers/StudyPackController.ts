import express from 'express';
import FolderModel from '../Persistance/FolderModel';
import { createStudyPack, getStudyPacksByUserId } from '../Persistance/StudyPackModel';
import FileTreeService from '../Services/FileTreeService';
import { createStudyPackObject } from '../Services/StudyPackService';
import { getUserIdFromRequest } from '../utils/passport/authHelpers';

export class StudyPackController {
  public async getStudyPacksByUserId(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);

    try {
      const studyPacks = await getStudyPacksByUserId(userId);
      const studyPackObject = createStudyPackObject(studyPacks);

      return res.status(200).json({
        success: true,
        data: {
          studyPacks: studyPackObject
        }
      });
    } catch (e) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  public async createStudyPack(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const userId = getUserIdFromRequest(req);
      const { binder_id, name, color } = req.body;
      const response = await createStudyPack(binder_id, name, userId, color);
      return res.status(200).json({
        success: true,
        data: {
          binder: response
        }
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}
