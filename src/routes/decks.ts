import express from "express";
import { commonBaseUrl } from ".";
import { DeckController, FlashcardController } from "../Controllers";
import { catchAsync } from "../utils";
import passport from "./routes.helpers";

const router = express();

const deckController = new DeckController();
const flashcardController = new FlashcardController();
export const decksRoute = `${commonBaseUrl}/decks`;

router.get(
  `/spaced-repetition`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(flashcardController.getDueDecks(req, res, next));
  }
);

router.get(
  `/study-sets/:study_set_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(deckController.getDeckByStudySetId(req, res, next));
  }
);

export { router as decksRouter };
