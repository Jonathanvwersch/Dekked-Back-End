import express from "express";
import {
  createStudySet,
  getStudySetsByUserId,
} from "../Persistance/StudySetModel";
import DeckService from "../Services/DeckService";
import PageService from "../Services/PageService";
import StudySetService, {
  createStudySetObject,
} from "../Services/StudySetService";
import { getUserIdFromRequest } from "../utils/passport/authHelpers";

export class StudySetController {
  public async getStudySets(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);

    try {
      const studySets = await getStudySetsByUserId(userId);
      const studyPackObject = createStudySetObject(studySets);
      return res.status(200).json({
        ...studyPackObject,
      });
    } catch (e) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  public async createStudySet(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { binder_id, name, color, id } = req.body;

    try {
      const response = await createStudySet(binder_id, name, userId, color, id);
      await PageService.createPage(id, userId);
      await DeckService.createDeck(id, name, userId);
      return res.status(200).json({
        ...response,
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async updateStudySet(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { name, color, study_set_id } = req.body;

    try {
      await StudySetService.updateStudySet({
        name,
        color,
        study_set_id,
        owner_id: userId,
      });

      await DeckService.updateDeck(name, study_set_id, userId);
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async deleteStudySet(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { study_set_id } = req.body;

    try {
      await StudySetService.deleteStudySet({
        study_set_id,
        owner_id: userId,
      });
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}
