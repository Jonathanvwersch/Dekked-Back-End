import express from "express";
import { commonBaseUrl } from ".";
import { FlashcardController } from "../Controllers";
import { catchAsync } from "../utils";
import passport from "./routes.helpers";

const router = express();

const flashcardController = new FlashcardController();
export const flashcardsRoute = `${commonBaseUrl}/flashcards`;

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(flashcardController.createFlashCard)
);

router.get(
  `/:deck_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(flashcardController.getFlashcards)
);

router.get(
  `/binder/:id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(flashcardController.getBinderFlashcards)
);

router.get(
  `/spaced-repetition/:deck_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(flashcardController.getSpacedRepetitionFlashcards)
);

router.patch(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(flashcardController.updateFlashcard)
);

router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(flashcardController.deleteFlashcard)
);

export { router as flashcardsRouter };
