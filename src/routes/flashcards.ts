import express from "express";
import { commonBaseUrl } from ".";
import { FlashcardController } from "../Controllers";
import passport from "./routes.helpers";

const router = express();

const flashcardController = new FlashcardController();
export const flashcardsRoute = `${commonBaseUrl}/flashcards`;

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.createFlashCard
);

router.get(
  `/:deck_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.getFlashcards
);

router.get(
  `/spaced-repetition/:deck_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.getSpacedRepetitionFlashcards
);

router.patch(
  `/:flashcard_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => flashcardController.updateFlashcard(req, res)
);

router.delete(
  `/:flashcard_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => flashcardController.deleteFlashcard(req, res)
);

export { router as flashcardsRouter };
