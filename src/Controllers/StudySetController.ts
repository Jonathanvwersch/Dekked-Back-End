import express, { NextFunction } from "express";
import DeckModel from "../Persistance/DeckModel";
import PageModel from "../Persistance/PageModel";
import {
  createStudySet,
  getStudySetsByUserId,
} from "../Persistance/StudySetModel";
import StudySetService, {
  createStudySetObject,
} from "../Services/StudySetService";
import { getUserIdFromRequest, returnSuccessData } from "../utils";

export class StudySetController {
  public async getStudySets(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);

    const studySets = await getStudySetsByUserId(userId);
    const studyPackObject = createStudySetObject(studySets);

    return res.status(200).json({
      ...studyPackObject,
    });
  }

  public async createStudySet(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { binder_id, name, color, id } = req.body;

    const response = await createStudySet(binder_id, name, userId, color, id);
    await PageModel.createPage(id, userId);
    await DeckModel.createDeck(id, name, userId);

    return res.status(200).json(response);
  }

  public async updateStudySet(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { name, color, study_set_id } = req.body;

    const studySet = await StudySetService.updateStudySet({
      name,
      color,
      study_set_id,
      owner_id: userId,
    });
    await DeckModel.updateDeck(name, study_set_id, userId);

    return res.status(200).json(studySet);
  }

  public async deleteStudySet(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { study_set_id } = req.body;

    await StudySetService.deleteStudySet({
      study_set_id,
      owner_id: userId,
    });

    return res.sendStatus(200);
  }
}
