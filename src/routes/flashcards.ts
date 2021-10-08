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
  (req, res, next) => {
    catchAsync(flashcardController.createFlashCard(req, res, next));
  }
);

router.get(
  `/:deck_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(flashcardController.getFlashcards(req, res, next));
  }
);

router.get(
  `/spaced-repetition/:deck_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(
      flashcardController.getSpacedRepetitionFlashcards(req, res, next)
    );
  }
);

router.patch(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(flashcardController.updateFlashcard(req, res, next));
  }
);

router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(flashcardController.deleteFlashcard(req, res, next));
  }
);

export { router as flashcardsRouter };
