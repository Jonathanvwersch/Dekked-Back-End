import express, { NextFunction } from "express";
import DeckModel from "../Persistance/DeckModel";
import { getUserIdFromRequest, missingParams } from "../utils";
export class DeckController {
  public async getDeckByStudySetId(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const { study_set_id } = req.params;
    missingParams(req.body, ["study_set_id"]);

    const ownerId = getUserIdFromRequest(req);

    const response = await DeckModel.getDeckByStudySetId(study_set_id, ownerId);

    return res.status(200).json({
      ...response,
    });
  }
}
