import express from "express";
import FlashcardService from "../Services/FlashcardService";
import { FlashcardInterface } from "../types";
import { getUserIdFromRequest } from "../utils/passport/authHelpers";

export class FlashcardController {
  public async getFullFlashcardsByDeckId(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { deck_id } = req.params;

    try {
      const flashcards = await FlashcardService.getFullFlashcardsByDeckId(
        deck_id,
        userId
      );
      return res.status(200).json({
        success: true,
        data: {
          flashcards,
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
  public async getSpacedRepetitionDeckByDeckId(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { deck_id } = req.params;

    try {
      const flashcards = await FlashcardService.getSpacedRepetitionDeckByDeckId(
        deck_id,
        userId
      );
      return res.status(200).json({
        success: true,
        data: {
          flashcards,
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  public async createFlashCard(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const {
      study_set_id,
      block_link,
      front_blocks,
      front_draft_keys,
      back_blocks,
      back_draft_keys,
      deck_id,
    } = req.body;

    try {
      const flashcard = await FlashcardService.createFlashcard(
        study_set_id,
        userId,
        deck_id,
        block_link,
        front_blocks,
        front_draft_keys,
        back_blocks,
        back_draft_keys
      );

      const fullFlashcard = {
        ...flashcard,
        front_blocks,
        back_blocks,
      };

      return res.status(200).json({
        success: true,
        fullFlashcard,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  public async saveFullFlashcard(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { flashcard_id } = req.params;
    const {
      front_blocks,
      front_draft_keys,
      back_blocks,
      back_draft_keys,
      quality,
    } = req.body;

    try {
      const flashcard = await FlashcardService.saveFlashcard(
        flashcard_id,
        userId,
        front_blocks,
        front_draft_keys,
        back_blocks,
        back_draft_keys
      );

      const fullFlashcard: FlashcardInterface = {
        ...flashcard,
        front_blocks,
        back_blocks,
      };

      return res.status(200).json({
        success: true,
        fullFlashcard,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  public async deleteFlashcard(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { flashcard_id } = req.params;

    try {
      await FlashcardService.deleteFlashcard(userId, flashcard_id);
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
