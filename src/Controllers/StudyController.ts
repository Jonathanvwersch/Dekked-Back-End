import ClassicCardModel from "../Persistance/ClassicCardModel";
import express from "express";
import StudyService from "../Services/StudyService";

export class StudyController {
  public async getSpacedRepetitionCards(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const response = await ClassicCardModel.getAllCards();
      const cards = StudyService.getSpacedRepetitionQueuedCards(response);
      return res.status(200).json({ ...cards });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  //   public async updateSpacedRepetitionValues (
  //     req: express.Request,
  //     res: express.Response
  //   ): Promise<express.Response<any>>{
  //     try {
  //         const {difficulty, card_id} = req.body();
  //         const card = await ClassicCardModel.getCard(card_id);

  //         if (card.status === "new") {

  //         }
  //     }
  //   }
}
