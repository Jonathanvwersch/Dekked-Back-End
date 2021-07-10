"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeckController = void 0;
const DeckModel_1 = __importDefault(require("../Persistance/DeckModel"));
const DeckService_1 = __importDefault(require("../Services/DeckService"));
class DeckController {
  createDeck(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const { folder_id, name } = req.body;
        if (folder_id && name) {
          const response = yield DeckModel_1.default.createDeck({
            folder_id,
            name,
          });
          return res.status(200).json({
            success: true,
            data: response,
          });
        } else {
          return res
            .status(400)
            .json({
              success: false,
              error: "Properties not found, type and cardData not found",
            });
        }
      } catch (e) {
        return res.status(500).json({ success: false, error: e.message });
      }
    });
  }
  getDeck(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (req.params.deck_id) {
          const response = yield DeckModel_1.default.getDeck(
            req.params.deck_id
          );
          return res.status(200).json({
            success: true,
            data: response,
          });
        } else {
          return res
            .status(400)
            .json({ success: false, error: "Property deck_id not found" });
        }
      } catch (e) {
        return res.status(500).json({ success: false, error: e.message });
      }
    });
  }
  updateDeck(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (!req.body.deck_id)
          return res
            .status(400)
            .json({ success: false, error: "Property deck_id not found" });
        const response = yield DeckModel_1.default.updateDeck(req.body);
        if (!response) {
          return res
            .status(404)
            .json({ success: false, error: "Deck not found" });
        }
        return res.status(200).json({ success: true });
      } catch (e) {
        return res.status(500).json({ success: false, error: e.message });
      }
    });
  }
  deleteDeck(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (!req.body.deck_id)
          return res
            .status(400)
            .json({ success: false, error: "Property deck_id not found" });
        const response = yield DeckModel_1.default.deleteDeck(req.body.deck_id);
        if (!response)
          return res
            .status(404)
            .json({ success: false, error: "Deck not found" });
        return res.status(200).json({ success: true });
      } catch (e) {
        return res.status(500).json({ success: false, error: e.message });
      }
    });
  }
  getDecksInFolder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        console.log(req.params);
        if (!req.params.folder_id)
          return res
            .status(400)
            .json({ success: false, error: "Property folder_id not found" });
        const response = yield DeckModel_1.default.getDecksInFolder(
          req.params.folder_id
        );
        console.log(response);
        return res.status(200).json({ success: true, data: response });
      } catch (e) {
        console.log(e.message);
        return res.status(500).json({ success: false, error: e.message });
      }
    });
  }
  getAllDecks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const response = yield DeckModel_1.default.getAllDecks();
        const decks = DeckService_1.default.createDeckObject(response);
        return res.status(200).json({ success: true, data: decks });
      } catch (e) {
        console.log(e.message);
        return res.status(500).json({ success: false, error: e.message });
      }
    });
  }
}
exports.DeckController = DeckController;
