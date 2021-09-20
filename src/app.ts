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
const { APP_ENV } = config;

//-----------------------------//

// User
app.post("/api/v1/register", (req, res) => {
  userController.register(req, res);
});

app.post("/api/v1/login", (req, res) => {
  userController.login(req, res);
});

app.post("/api/v1/auth/google", (req, res) => {
  userController.googleAuthentication(req, res);
});

app.get(
  "/api/v1/user",
  passport.authenticate("jwt", {
    session: false,
  }),
  userController.getUser
);

app.patch(
  "/api/v1/user",
  passport.authenticate("jwt", {
    session: false,
  }),
  userController.updateUser
);

app.post("/api/v1/verify-user-email", (req, res) => {
  userController.verifyUserEmail(req, res);
});

app.patch("/api/v1/forget-password", (req, res) => {
  userController.forgetPassword(req, res);
});

app.patch("/api/v1/reset-password", (req, res) => {
  userController.resetPassword(req, res);
});

//-----------------------------//

// Filetree
app.get(
  "/api/v1/file-tree",
  passport.authenticate("jwt", {
    session: false,
  }),
  fileTreeController.getFileTree
);
//-----------------------------//

// Folders
app.patch(
  `/api/v1/folder`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => folderController.updateFolder(req, res)
);

app.post(
  `/api/v1/folder`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => folderController.createFolder(req, res)
);

app.delete(
  `/api/v1/folder`,
  passport.authenticate("jwt", {
    session: false,
  }),
  folderController.deleteFolder
);

app.get(
  `/api/v1/folders`,
  passport.authenticate("jwt", {
    session: false,
  }),
  folderController.getFolders
);

//-----------------------------//

// Binders
app.get(
  `/api/v1/binders`,
  passport.authenticate("jwt", {
    session: false,
  }),
  binderController.getBindersByUserId
);

app.post(
  `/api/v1/binder`,
  passport.authenticate("jwt", {
    session: false,
  }),
  binderController.createBinder
);

app.patch(
  `/api/v1/binder`,
  passport.authenticate("jwt", {
    session: false,
  }),
  binderController.updateBinder
);

app.delete(
  `/api/v1/binder`,
  passport.authenticate("jwt", {
    session: false,
  }),
  binderController.deleteBinder
);

//-----------------------------//

// Study Packs
app.get(
  `/api/v1/study-sets`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studyPackController.getStudySetsByUserId
);

app.post(
  `/api/v1/study-set`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studyPackController.createStudySet
);

app.patch(
  `/api/v1/study-set`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studyPackController.updateStudySet
);

app.delete(
  `/api/v1/study-set`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studyPackController.deleteStudySet
);

//-----------------------------//

// Pages
app.patch(
  "/api/v1/page/:page_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => pageController.saveFullPage(req, res)
);
app.get("/api/v1/pages", (_, res) => pageController.getPages(res));
app.get("/api/v1/page-meta/:page_id", (req, res) =>
  pageController.getPageMeta(req, res)
);
app.get("/api/v1/page/:page_id", (req, res) =>
  pageController.getFullPage(req, res)
);
app.get(
  "/api/v1/get-page-by-study-set-id/:study_set_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  pageController.getPageByStudySetId
);

// Block
app.get(
  "/api/v1/get-blocks-by-page/:page_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  blockController.getBlocksByPage
);

//-----------------------------//

// Flashcards and Decks
app.get(
  "/api/v1/get-deck-by-study-set-id/:study_set_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  deckController.getDeckByStudySetId
);

app.get(
  "/api/v1/get-flashcards-by-deck-id/:deck_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.getFullFlashcardsByDeckId
);

app.get(
  "/api/v1/get-sr-flashcards-by-deck-id/:deck_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.getSpacedRepetitionDeckByDeckId
);

app.get(
  "/api/v1/get-all-due-sr-decks",
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.getAllDueDecks
);

app.post(
  "/api/v1/flashcard",
  passport.authenticate("jwt", {
    session: false,
  }),
  flashcardController.createFlashCard
);

app.patch(
  "/api/v1/flashcard/:flashcard_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => flashcardController.saveFullFlashcard(req, res)
);

app.delete(
  "/api/v1/flashcard/:flashcard_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => flashcardController.deleteFlashcard(req, res)
);

//-----------------------------//

APP_ENV === "development" &&
  app.listen(5000, () =>
    console.log("Development server is up and running on port 5000")
  );

APP_ENV === "integration" &&
  app.listen(5000, () =>
    console.log("Integration server is up and running on port 5000")
  );

APP_ENV === "staging" &&
  app.listen(5000, () =>
    console.log("Staging server is up and running on port 5000")
  );

APP_ENV === "production" &&
  app.listen(5000, () =>
    console.log("Production server is up and running on port 5000")
  );
