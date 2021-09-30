import express from "express";
import { commonBaseUrl } from ".";
import { DeckController, FlashcardController } from "../Controllers";
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
  flashcardController.getDueDecks
);

router.get(
  `/study-sets/:study_set_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  deckController.getDeckByStudySetId
);

export { router as decksRouter };
