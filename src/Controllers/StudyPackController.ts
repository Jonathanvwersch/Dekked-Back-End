import express from 'express';
import FolderModel from '../Persistance/FolderModel';
import { createStudyPack, getStudyPacksByUserId } from '../Persistance/StudyPackModel';
import FileTreeService from '../Services/FileTreeService';
import PageService from '../Services/PageService';
import StudyPackService, { createStudyPackObject } from '../Services/StudyPackService';
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
      await PageService.createPage(response.id, undefined, userId);
      return res.status(200).json({
        success: true,
        data: {
          study_pack: response
        }
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async updateStudyPack(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { name, color, study_pack_id } = req.body;
    try {
      await StudyPackService.updateStudyPack({
        name,
        color,
        study_pack_id,
        owner_id: userId
      });
      return res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async deleteStudyPack(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { study_pack_id } = req.body;
    try {
      await StudyPackService.deleteStudyPack({
        study_pack_id,
        owner_id: userId
      });
      return res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}
