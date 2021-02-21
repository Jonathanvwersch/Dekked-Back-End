import express from 'express';
import { FolderController } from './Controllers/FolderController';
import { DeckController } from './Controllers/DeckController';
import { CardController } from './Controllers/CardController';
import cors from 'cors';
import { StudyController } from './Controllers/StudyController';
import { PageController } from './Controllers/PageController';
import { BlockController } from './Controllers/BlockController';
import { UserController } from './Controllers/UserController';
import cookieParser from 'cookie-parser';
import { applyPassportStrategy } from './utils/passport/passport';
import passport from 'passport';
import { FileTreeController } from './Controllers/FileTreeController';
import { BinderController } from './Controllers/BinderController';
import { StudyPackController } from './Controllers/StudyPackController';
// require('./utils/passport/passport');

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
app.post('/register', (req, res) => {
  userController.register(req, res);
});

app.post('/login', (req, res) => {
  userController.login(req, res);
});

app.get(
  '/auth',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const user: any = req.user;
    if (user) {
      if (user._id) {
        res.json({
          success: true,
          data: {
            userId: user._id
          }
        });
      }
    }
  }
);

app.get(
  '/file-tree',
  passport.authenticate('jwt', {
    session: false
  }),
  fileTreeController.getFileTree
);

// Folders
// app.put(
//   '/folders/move',
//   passport.authenticate('jwt', {
//     session: false
//   }),
//   (req, res) => folderController.moveFolder(req, res)
// );
app.post(
  '/folder',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => folderController.createFolder(req, res)
);
// app.delete(
//   '/folders',
//   passport.authenticate('jwt', {
//     session: false
//   }),
//   (req, res) => folderController.deleteFolder(req, res)
// );

app.get(
  '/folders',
  passport.authenticate('jwt', {
    session: false
  }),
  folderController.getFolders
);

// Card
app.post('/card', (req, res) => cardController.createCard(req, res));
app.get('/card/:card_id', (req, res) => cardController.getCard(req, res));
app.patch('/card', (req, res) => cardController.updateCard(req, res));
app.delete('/card', (req, res) => cardController.deleteCard(req, res));

//Cards
app.get('/cards/:deck_id', (req, res) => cardController.getCardsInDeck(req, res));

// Deck
app.post('/deck', (req, res) => deckController.createDeck(req, res));
app.get('/deck/:deck_id', (req, res) => deckController.getDeck(req, res));
app.patch('/deck', (req, res) => deckController.updateDeck(req, res));
app.delete('/deck', (req, res) => deckController.deleteDeck(req, res));

// Decks
app.get('/decks', (req, res) => deckController.getAllDecks(req, res));
app.get('/decks/:folder_id', (req, res) => deckController.getDecksInFolder(req, res));

// Study
app.get('/study/spaced-repetition', (req, res) =>
  studyController.getSpacedRepetitionCards(req, res)
);
//Binders
app.get(
  '/binders',
  passport.authenticate('jwt', {
    session: false
  }),
  binderController.getBindersByUserId
);

app.post(
  '/binder',
  passport.authenticate('jwt', {
    session: false
  }),
  binderController.createBinder
);

// Study Packs
app.get(
  '/study-packs',
  passport.authenticate('jwt', {
    session: false
  }),
  studyPackController.getStudyPacksByUserId
);

app.post(
  '/study-pack',
  passport.authenticate('jwt', {
    session: false
  }),
  studyPackController.createStudyPack
);

// Pages
app.put('/page/:page_id', (req, res) => pageController.saveFullPage(req, res));
app.get('/pages', (req, res) => pageController.getPages(req, res));
app.get('/page-meta/:page_id', (req, res) => pageController.getPageMeta(req, res));
app.get('/page/:page_id', (req, res) => pageController.getFullPage(req, res));
app.post('/page', (req, res) => pageController.createPage(req, res));
app.patch('/page', (req, res) => pageController.updatePage(req, res));
// Block
app.post('/block', (req, res) => blockController.createBlock(req, res));

app.listen(5000, () => console.log('Server running'));
