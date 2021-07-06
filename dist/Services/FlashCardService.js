"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
const BlockModel_1 = __importDefault(require("../Persistance/BlockModel"));
const FlashcardModel_1 = __importDefault(
  require("../Persistance/FlashcardModel")
);
const BlockService_1 = __importStar(require("./BlockService"));
function createFlashcard(
  study_set_id,
  owner_id,
  block_link,
  front_blocks,
  front_draft_keys,
  back_blocks,
  back_draft_keys
) {
  var _a, _b;
  return __awaiter(this, void 0, void 0, function* () {
    const result = yield FlashcardModel_1.default.createFlashcard({
      owner_id,
      study_set_id,
      block_link,
      front_draft_keys,
      back_draft_keys,
    });
    if (result.length) {
      yield BlockService_1.saveBlocks(
        front_blocks !== null && front_blocks !== void 0 ? front_blocks : [],
        (_a = result[0]) === null || _a === void 0 ? void 0 : _a.id,
        front_draft_keys !== null && front_draft_keys !== void 0
          ? front_draft_keys
          : [],
        owner_id
      );
      yield BlockService_1.saveBlocks(
        back_blocks !== null && back_blocks !== void 0 ? back_blocks : [],
        (_b = result[0]) === null || _b === void 0 ? void 0 : _b.id,
        back_draft_keys !== null && back_draft_keys !== void 0
          ? back_draft_keys
          : [],
        owner_id
      );
      return result[0];
    } else {
      throw new Error("There was an error creating flashcard");
    }
  });
}
function getFullFlashcardsByStudySetId(study_set_id, owner_id) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const flashcards = yield FlashcardModel_1.default.getFlashcardsByStudySetId(
        owner_id,
        study_set_id
      );
      const fullFlashcards = yield Promise.all(
        flashcards.map((val) =>
          __awaiter(this, void 0, void 0, function* () {
            const blocksInCard = yield BlockModel_1.default.getBlocksByParentId(
              val.id
            );
            const front_blocks = BlockService_1.getOrganizedBlocks(
              val.front_ordering,
              blocksInCard
            );
            const back_blocks = BlockService_1.getOrganizedBlocks(
              val.back_ordering,
              blocksInCard
            );
            return {
              flashcard: val,
              front_blocks,
              back_blocks,
            };
          })
        )
      );
      return fullFlashcards;
    } catch (error) {
      console.log(error);
      throw Error("There was an error getting flashcards by studypack id");
    }
  });
}
function saveFlashcard(
  flash_card_id,
  owner_id,
  front_blocks,
  front_draft_keys,
  back_blocks,
  back_draft_keys
) {
  return __awaiter(this, void 0, void 0, function* () {
    yield BlockService_1.saveBlocks(
      front_blocks,
      flash_card_id,
      front_draft_keys,
      owner_id
    );
    yield BlockService_1.saveBlocks(
      back_blocks,
      flash_card_id,
      back_draft_keys,
      owner_id
    );
    const flashcard = yield FlashcardModel_1.default.updateFlashcard({
      id: flash_card_id,
      owner_id,
      back_ordering: back_draft_keys,
      front_ordering: front_draft_keys,
    });
    return flashcard[0];
  });
}
function deleteFlashcard(owner_id, id) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const blocks = yield BlockService_1.default.getBlocksInParent(id);
      yield Promise.all(
        blocks.map((val) =>
          __awaiter(this, void 0, void 0, function* () {
            return BlockService_1.default.deleteBlock(val.id, owner_id);
          })
        )
      );
      yield FlashcardModel_1.default.deleteFlashcard({
        owner_id,
        id,
      });
    } catch (error) {
      console.log(error);
      throw Error("There was an error deleting flashcard");
    }
  });
}
exports.default = {
  createFlashcard,
  getFullFlashcardsByStudySetId,
  saveFlashcard,
  deleteFlashcard,
};
