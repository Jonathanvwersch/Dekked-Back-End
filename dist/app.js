"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FolderController_1 = require("./Controllers/FolderController");
const DeckController_1 = require("./Controllers/DeckController");
const CardController_1 = require("./Controllers/CardController");
const cors_1 = __importDefault(require("cors"));
const StudyController_1 = require("./Controllers/StudyController");
const PageController_1 = require("./Controllers/PageController");
const BlockController_1 = require("./Controllers/BlockController");
const UserController_1 = require("./Controllers/UserController");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = require("./utils/passport/passport");
const passport_2 = __importDefault(require("passport"));
const FileTreeController_1 = require("./Controllers/FileTreeController");
const BinderController_1 = require("./Controllers/BinderController");
const StudySetController_1 = require("./Controllers/StudySetController");
const FlashcardController_1 = require("./Controllers/FlashcardController");
const app = express_1.default();
passport_1.applyPassportStrategy(passport_2.default);
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
app.use(cors_1.default());
const folderController = new FolderController_1.FolderController();
const deckController = new DeckController_1.DeckController();
const cardController = new CardController_1.CardController();
const studyController = new StudyController_1.StudyController();
const pageController = new PageController_1.PageController();
const blockController = new BlockController_1.BlockController();
const userController = new UserController_1.UserController();
const fileTreeController = new FileTreeController_1.FileTreeController();
const binderController = new BinderController_1.BinderController();
const studyPackController = new StudySetController_1.StudySetController();
const flashcardController = new FlashcardController_1.FlashcardController();
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
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const user = req.user;
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
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  userController.getUser
);
app.put(
  "/user",
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  userController.editUser
);
//-----------------------------//
// Filetree
app.get(
  "/file-tree",
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  fileTreeController.getFileTree
);
//-----------------------------//
// Folders
app.put(
  `/folder`,
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  (req, res) => folderController.updateFolder(req, res)
);
app.post(
  `/folder`,
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  (req, res) => folderController.createFolder(req, res)
);
app.delete(
  `/folder`,
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  folderController.deleteFolder
);
app.get(
  `/folders`,
  passport_2.default.authenticate("jwt", {
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
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  binderController.getBindersByUserId
);
app.post(
  `/binder`,
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  binderController.createBinder
);
app.put(
  `/binder`,
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  binderController.updateBinder
);
app.delete(
  `/binder`,
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  binderController.deleteBinder
);
//-----------------------------//
// Study Packs
app.get(
  `/study-packs`,
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  studyPackController.getStudySetsByUserId
);
app.post(
  `/study-set`,
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  studyPackController.createStudySet
);
app.put(
  `/study-set`,
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  studyPackController.updateStudySet
);
app.delete(
  `/study-set`,
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  studyPackController.deleteStudySet
);
//-----------------------------//
// Pages
app.put(
  "/page/:page_id",
  passport_2.default.authenticate("jwt", {
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
  "/get-page-by-parent-id/:study_set_id",
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  pageController.getPageByStudySetId
);
// Block
app.get(
  "/get-blocks-by-page/:page_id",
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  blockController.getBlocksByPage
);
//-----------------------------//
// Flashcards
app.get(
  "/get-flashcards-by-study-set-id/:study_set_id",
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  flashcardController.getFullFlashcardsByStudySetId
);
app.post(
  "/flashcard",
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  flashcardController.createFlashCard
);
app.put(
  "/flashcard/:flash_card_id",
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  (req, res) => flashcardController.saveFullFlashcard(req, res)
);
app.delete(
  "/flashcard/:flash_card_id",
  passport_2.default.authenticate("jwt", {
    session: false,
  }),
  (req, res) => flashcardController.deleteFlashcard(req, res)
);
//-----------------------------//
app.listen(5000, () =>
  console.log("Server running is up and running on port 5000")
);
