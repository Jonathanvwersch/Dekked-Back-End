import express, { NextFunction } from "express";
import DeckService from "../Services/DeckService";
export class DeckController {
  public async getDeckByStudySetId(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const { study_set_id } = req.params;
    const response = await DeckService.getDeckByStudySetId(study_set_id);

    return res.status(200).json({
      ...response,
    });
  }
}
