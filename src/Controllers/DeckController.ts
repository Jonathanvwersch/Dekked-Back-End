import express from "express";
import DeckService from "../Services/DeckService";
export class DeckController {
  public async getDeckByStudySetId(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const { study_set_id } = req.params;
    try {
      const response = await DeckService.getDeckByStudySetIdAsync(study_set_id);
      return res.status(200).json({
        success: true,
        data: {
          deck: response,
        },
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}
