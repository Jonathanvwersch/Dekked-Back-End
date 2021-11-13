import express, { NextFunction } from "express";
import db from "../db/database";
import {
  getBinderIdsByFolderId,
  getStudySetIdsByBinderId,
  getStudySetIdsByMultipleBinderIds,
  updateUser,
} from "../Persistance";
import FlashcardService from "../Services/FlashcardService";
import { FILETREE_TYPES, FlashcardInterface } from "../types";
import {
  spacedRepetition,
  getUserIdFromRequest,
  ErrorHandler,
  missingParams,
} from "../utils";

export class FlashcardController {
  public async getFlashcards(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<FlashcardInterface>> {
    const userId = getUserIdFromRequest(req);
    const { id, type } = req.query as { id: string; type: FILETREE_TYPES };

    let flashcards: FlashcardInterface[] = [];

    if (type === FILETREE_TYPES.FOLDER) {
      const binderIds = await getBinderIdsByFolderId(userId, id);
      const studySetIds = await getStudySetIdsByMultipleBinderIds(
        binderIds,
        userId
      );
      flashcards = await FlashcardService.getFolderFlashcards(
        studySetIds,
        userId
      );
    } else if (type === FILETREE_TYPES.BINDER) {
      const studySetIds = await getStudySetIdsByBinderId(id, userId);
      flashcards = await FlashcardService.getBinderFlashcards(
        studySetIds,
        userId
      );
    } else {
      flashcards = await FlashcardService.getStudySetFlashcards(id, userId);
    }

    return res.status(200).json(flashcards);
  }

  public async getSpacedRepetitionFlashcards(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { id, type } = req.query as { id: string; type: FILETREE_TYPES };

    const flashcards = await FlashcardService.getSpacedRepetitionDeckByStudySetId(
      id,
      userId,
      type
    );

    return res.status(200).json(flashcards);
  }

  public async getDueDecks(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const decks = await FlashcardService.getAllDueDecks(userId);

    if (!decks) {
      throw new ErrorHandler(500, "There was an error getting the due decks");
    }

    return res.status(200).json(decks);
  }

  public async createFlashCard(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    missingParams(req.body, ["study_set_id"]);

    const {
      study_set_id,
      block_link,
      front_blocks,
      front_draft_keys,
      back_blocks,
      back_draft_keys,
      deck_id,
    } = req.body;

    // update recently visited array
    await updateUser({ id: userId, recently_visited: study_set_id });

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
  }

  public async updateFlashcard(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const owner_id = getUserIdFromRequest(req);
    missingParams(req.body, ["flashcard_id"]);

    const {
      front_blocks,
      front_draft_keys,
      back_blocks,
      back_draft_keys,
      quality,
      interval,
      learning_status,
      flashcard_id: id,
      study_set_id,
      starred,
    } = req.body;

    // update recently visited array
    await updateUser({ id: owner_id, recently_visited: study_set_id });

    if (quality) {
      const currentFlashcards:
        | FlashcardInterface[]
        | undefined = await db
        .table("flashcards")
        .select("*")
        .where({ id, owner_id })
        .returning("*");

      if (currentFlashcards?.[0]) {
        const currentFlashcard: FlashcardInterface = currentFlashcards?.[0];
        spacedRepetition(currentFlashcard, quality, interval);

        const {
          ease_factor,
          failed_consecutive_attempts,
          due_date,
          interval: new_interval,
          status,
        } = currentFlashcard;

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
      }
    }

    const flashcard = await FlashcardService.saveFlashcard({
      id,
      owner_id,
      front_blocks,
      front_draft_keys,
      back_blocks,
      back_draft_keys,
      starred,
    });

    const fullFlashcard: FlashcardInterface = {
      ...flashcard,
      front_blocks,
      back_blocks,
    };

    return res.status(200).json({
      ...fullFlashcard,
    });
  }

  public async deleteFlashcard(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    missingParams(req.body, ["flashcard_id"]);

    const { flashcard_id } = req.body;

    await FlashcardService.deleteFlashcard(userId, flashcard_id);

    return res.sendStatus(200);
  }
}
