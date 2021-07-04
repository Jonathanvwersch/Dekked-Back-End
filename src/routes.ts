import express from "express";
import { FolderController } from "./Controllers/FolderController";
import { DeckController } from "./Controllers/DeckController";
import { CardController } from "./Controllers/CardController";
import cors from "cors";
import { StudyController } from "./Controllers/StudyController";
import { PageController } from "./Controllers/PageController";
import { BlockController } from "./Controllers/BlockController";
import { UserController } from "./Controllers/UserController";
import cookieParser from "cookie-parser";
import { applyPassportStrategy } from "./utils/passport/passport";
import passport from "passport";
import { FileTreeController } from "./Controllers/FileTreeController";
import { BinderController } from "./Controllers/BinderController";
import { StudyPackController } from "./Controllers/StudyPackController";
import { FlashcardController } from "./Controllers/FlashcardController";
import { FILETREE_TYPES } from "./types";

const app = express();
applyPassportStrategy(passport);
app.use(cookieParser());
app.use(express.json());
app.use(cors());

const folderController = new FolderController();
const deckController = new DeckController();
const cardController = new CardController();
const studyController = new StudyController();
const pageController = new PageController();
const blockController = new BlockController();
const userController = new UserController();
const fileTreeController = new FileTreeController();
const binderController = new BinderController();
const studyPackController = new StudyPackController();
const flashcardController = new FlashcardController();

//-----------------------------//

// User
app.post("/register", (req, res) => {
  userController.register(req, res);
});

app.post("/login", (req, res) => {
  userController.login(req, res);
});

app.get(
  "/auth",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const user: any = req.user;
    if (user) {
      if (user._id) {
        res.json({
          success: true,
          data: {
            userId: user._id,
          },
        });
      }
    }
  }
);

app.get(
  "/user",
  passport.authenticate("jwt", {
    session: false,
  }),
  userController.getUser
);

app.put(
  "/user",
  passport.authenticate("jwt", {
    session: false,
  }),
  userController.editUser
);

//-----------------------------//

// Filetree

app.get(
  "/file-tree",
  passport.authenticate("jwt", {
    session: false,
  }),
  fileTreeController.getFileTree
);
//-----------------------------//

// Folders

app.put(
  `/folder`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => folderController.updateFolder(req, res)
);

app.post(
  `/folder`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => folderController.createFolder(req, res)
);

app.delete(
  `/folder`,
  passport.authenticate("jwt", {
    session: false,
  }),
  folderController.deleteFolder
);

app.get(
  `/folders`,
  passport.authenticate("jwt", {
    session: false,
  }),
  folderController.getFolders
);

//-----------------------------//

// Card
app.post("/card", (req, res) => cardController.createCard(req, res));
app.get("/card/:card_id", (req, res) => cardController.getCard(req, res));
app.patch("/card", (req, res) => cardController.updateCard(req, res));
app.delete("/card", (req, res) => cardController.deleteCard(req, res));

// Cards
app.get("/cards/:deck_id", (req, res) =>
  cardController.getCardsInDeck(req, res)
);

// Deck
app.post("/deck", (req, res) => deckController.createDeck(req, res));
app.get("/deck/:deck_id", (req, res) => deckController.getDeck(req, res));
app.patch("/deck", (req, res) => deckController.updateDeck(req, res));
app.delete("/deck", (req, res) => deckController.deleteDeck(req, res));

// Decks
app.get("/decks", (req, res) => deckController.getAllDecks(req, res));
app.get("/decks/:folder_id", (req, res) =>
  deckController.getDecksInFolder(req, res)
);

// Study
app.get("/study/spaced-repetition", (req, res) =>
  studyController.getSpacedRepetitionCards(req, res)
);

//-----------------------------//

// Binders
app.get(
  `/binders`,
  passport.authenticate("jwt", {
    session: false,
  }),
  binderController.getBindersByUserId
);

app.post(
  `/binder`,
  passport.authenticate("jwt", {
    session: false,
  }),
  binderController.createBinder
);

app.put(
  `/binder`,
  passport.authenticate("jwt", {
    session: false,
  }),
  binderController.updateBinder
);

app.delete(
  `/binder`,
  passport.authenticate("jwt", {
    session: false,
  }),
  binderController.deleteBinder
);

//-----------------------------//

// Study Packs
app.get(
  `/study-packs`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studyPackController.getStudyPacksByUserId
);

app.post(
  `/study-pack`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studyPackController.createStudyPack
);

app.put(
  `/study-pack`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studyPackController.updateStudyPack
);

app.delete(
  `/study-pack`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studyPackController.deleteStudyPack
);

//-----------------------------//

// Pages
app.put(
  "/page/:page_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => pageController.saveFullPage(req, res)
);
app.get("/pages", (req, res) => pageController.getPages(req, res));
app.get("/page-meta/:page_id", (req, res) =>
  pageController.getPageMeta(req, res)
);
app.get("/page/:page_id", (req, res) => pageController.getFullPage(req, res));
// app.post('/page', (req, res) => pageController.createPage(req, res));
app.patch("/page", (req, res) => pageController.updatePage(req, res));
app.get(
  "/get-page-by-parent-id/:study_pack_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  pageController.getPageByStudyPackId
);

// Block
app.get(
  "/get-blocks-by-page/:page_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  blockController.getBlocksByPage
);

//-----------------------------//

// Flashcards
app.get(
  "/get-flashcards-by-study-pack-id/:study_pack_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.getFullFlashcardsByStudyPackId
);

app.post(
  "/flashcard",
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.createFlashCard
);

app.put(
  "/flashcard/:flash_card_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => flashcardController.saveFullFlashcard(req, res)
);

app.delete(
  "/flashcard/:flash_card_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => flashcardController.deleteFlashcard(req, res)
);

//-----------------------------//

app.listen(5000, () =>
  console.log("Server running is up and running on port 5000")
);
