import express from "express";
import db from "../db/database";
import FlashcardService from "../Services/FlashcardService";
import { FlashcardInterface } from "../types";
import { spacedRepetition, getUserIdFromRequest } from "../utils";

export class FlashcardController {
  public async getFlashcards(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<FlashcardInterface>> {
    const userId = getUserIdFromRequest(req);
    const { deck_id } = req.params;

    try {
      const flashcards = await FlashcardService.getFullFlashcardsByDeckId(
        deck_id,
        userId
      );
      return res.status(200).json(flashcards);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  public async getSpacedRepetitionFlashcards(
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
      return res.status(200).json(flashcards);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  public async getDueDecks(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);

    try {
      const decks = await FlashcardService.getAllDueDecks(userId);
      return res.status(200).json(decks);
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
        ...fullFlashcard,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  public async updateFlashcard(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const { flashcard_id: id } = req.params;
    const {
      front_blocks,
      front_draft_keys,
      back_blocks,
      back_draft_keys,
      quality,
      interval,
      learning_status,
      owner_id,
    } = req.body;

    if (quality) {
      let flashcard: FlashcardInterface[] | undefined;

      try {
        flashcard = await db
          .table("flashcards")
          .select("*")
          .where({ id, owner_id })
          .returning("*");
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }

      if (flashcard) {
        const currentFlashcard = flashcard?.[0];
        spacedRepetition(currentFlashcard, quality, interval);

        const {
          ease_factor,
          failed_consecutive_attempts,
          due_date,
          interval: new_interval,
          status,
        } = currentFlashcard;

        try {
          const flashcard = await FlashcardService.saveFlashcard({
            ease_factor,
            failed_consecutive_attempts,
            due_date,
            interval: new_interval,
            status,
            id,
            owner_id,
            learning_status,
          });

          const fullFlashcard: FlashcardInterface = {
            ...flashcard,
            front_blocks,
            back_blocks,
          };

          return res.status(200).json({
            ...fullFlashcard,
          });
        } catch (error) {
          return res.status(500).json({ success: false, error: error.message });
        }
      }
    }

    try {
      const flashcard = await FlashcardService.saveFlashcard({
        id,
        owner_id,
        front_blocks,
        front_draft_keys,
        back_blocks,
        back_draft_keys,
      });

      const fullFlashcard: FlashcardInterface = {
        ...flashcard,
        front_blocks,
        back_blocks,
      };

      return res.status(200).json({
        ...fullFlashcard,
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
