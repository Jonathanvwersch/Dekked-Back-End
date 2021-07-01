import express from 'express';
import BlockModel from '../Persistance/BlockModel';
import { getOrganizedBlocks } from '../Services/BlockService';
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
      const {
        study_pack_id,
        block_link,
        front_blocks,
        front_draft_keys,
        back_blocks,
        back_draft_keys
      } = req.body;

      const response = await FlashcardService.createFlashcard(
        study_pack_id,
        userId,
        block_link,
        front_blocks,
        front_draft_keys,
        back_blocks,
        back_draft_keys
      );

      const fullFlashcard = {
        response,
        front_blocks,
        back_blocks
      };

      return res.status(200).json({
        success: true,
        fullFlashcard
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  public async saveFullFlashcard(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const userId = getUserIdFromRequest(req);
      const { flash_card_id } = req.params;

      const { front_blocks, front_draft_keys, back_blocks, back_draft_keys } = req.body;

      const flashcard = await FlashcardService.saveFlashcard(
        flash_card_id,
        userId,
        front_blocks,
        front_draft_keys,
        back_blocks,
        back_draft_keys
      );

      const fullFlashcard = {
        flashcard,
        front_blocks,
        back_blocks
      };

      return res.status(200).json({
        success: true,
        fullFlashcard
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  public async deleteFlashcard(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const userId = getUserIdFromRequest(req);
      const { flash_card_id } = req.params;

      await FlashcardService.deleteFlashcard(userId, flash_card_id);
      return res.status(200).json({
        success: true
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
