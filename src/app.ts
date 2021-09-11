import express from "express";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import { applyPassportStrategy } from "./utils/passport/passport";
import passport from "passport";

import { FolderController } from "./Controllers/FolderController";
import { PageController } from "./Controllers/PageController";
import { BlockController } from "./Controllers/BlockController";
import { UserController } from "./Controllers/UserController";
import { FileTreeController } from "./Controllers/FileTreeController";
import { BinderController } from "./Controllers/BinderController";
import { StudySetController } from "./Controllers/StudySetController";
import { FlashcardController } from "./Controllers/FlashcardController";
import { DeckController } from "./Controllers/DeckController";
import { config } from "./config";

const app = express();
applyPassportStrategy(passport);
app.use(cookieParser());
app.use(express.json());
app.use(compression());
app.use(cors());

const folderController = new FolderController();
const pageController = new PageController();
const blockController = new BlockController();
const userController = new UserController();
const deckController = new DeckController();
const fileTreeController = new FileTreeController();
const binderController = new BinderController();
const studyPackController = new StudySetController();
const flashcardController = new FlashcardController();
const { API_ENV } = config;

//-----------------------------//

// User
app.post("/register", (req, res) => {
  userController.register(req, res);
});

app.post("/login", (req, res) => {
  userController.login(req, res);
});

app.post("/auth/google", (req, res) => {
  userController.googleAuthentication(req, res);
});

app.get(
  "/user",
  passport.authenticate("jwt", {
    session: false,
  }),
  userController.getUser
);

app.patch(
  "/user",
  passport.authenticate("jwt", {
    session: false,
  }),
  userController.updateUser
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

app.patch(
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

app.patch(
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
  `/study-sets`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studyPackController.getStudySetsByUserId
);

app.post(
  `/study-set`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studyPackController.createStudySet
);

app.patch(
  `/study-set`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studyPackController.updateStudySet
);

app.delete(
  `/study-set`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studyPackController.deleteStudySet
);

//-----------------------------//

// Pages
app.patch(
  "/page/:page_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => pageController.saveFullPage(req, res)
);
app.get("/pages", (_, res) => pageController.getPages(res));
app.get("/page-meta/:page_id", (req, res) =>
  pageController.getPageMeta(req, res)
);
app.get("/page/:page_id", (req, res) => pageController.getFullPage(req, res));
app.get(
  "/get-page-by-study-set-id/:study_set_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  pageController.getPageByStudySetId
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

// Flashcards and Decks
app.get(
  "/get-deck-by-study-set-id/:study_set_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  deckController.getDeckByStudySetId
);

app.get(
  "/get-flashcards-by-deck-id/:deck_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.getFullFlashcardsByDeckId
);

app.get(
  "/get-sr-flashcards-by-deck-id/:deck_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.getSpacedRepetitionDeckByDeckId
);

app.get(
  "/get-all-due-sr-decks",
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.getAllDueDecks
);

app.post(
  "/flashcard",
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.createFlashCard
);

app.patch(
  "/flashcard/:flashcard_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => flashcardController.saveFullFlashcard(req, res)
);

app.delete(
  "/flashcard/:flashcard_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => flashcardController.deleteFlashcard(req, res)
);

//-----------------------------//

API_ENV === "development" &&
  app.listen(5000, () =>
    console.log("Development server is up and running on port 5000")
  );

API_ENV === "integration" &&
  app.listen(5000, () =>
    console.log("Integration server is up and running on port 5000")
  );

API_ENV === "staging" &&
  app.listen(5000, () =>
    console.log("Staging server is up and running on port 5000")
  );

API_ENV === "production" &&
  app.listen(5000, () =>
    console.log("Production server is up and running on port 5000")
  );
