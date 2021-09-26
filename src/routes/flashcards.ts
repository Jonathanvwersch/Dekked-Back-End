import express from "express";
import { commonBaseUrl } from ".";
import { FlashcardController } from "../Controllers";
import passport from "./routes.helpers";

const router = express();

const flashcardController = new FlashcardController();

router.post(
  `${commonBaseUrl}/flashcards`,
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.createFlashCard
);

router.get(
  `${commonBaseUrl}/flashcards/:deck_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.getFlashcards
);

router.get(
  `${commonBaseUrl}/flashcards/spaced-repetition/:deck_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.getSpacedRepetitionFlashcards
);

router.patch(
  `${commonBaseUrl}/flashcards/:flashcard_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => flashcardController.updateFlashcard(req, res)
);

router.delete(
  `${commonBaseUrl}/flashcards/:flashcard_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => flashcardController.deleteFlashcard(req, res)
);

export { router as flashcardsRouter };
