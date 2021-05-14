import express from 'express';
import FlashcardService from '../Services/FlashcardService';
import { getUserIdFromRequest } from '../utils/passport/authHelpers';

export class FlashcardController {
  public async getFullFlashcardsByStudyPackId(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const userId = getUserIdFromRequest(req);
      const { study_pack_id } = req.params;
      const flashcards = await FlashcardService.getFullFlashcardsByStudyPackId(
        study_pack_id,
        userId
      );
      return res.status(200).json({
        success: true,
        data: {
          flashcards
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  public async createFlashCard(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const userId = getUserIdFromRequest(req);
      const { study_pack_id, linked_block } = req.body;

      const response = await FlashcardService.createFlashcard(study_pack_id, userId, linked_block);
      return res.status(200).json({
        success: true,
        data: { flashcard_id: response }
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
