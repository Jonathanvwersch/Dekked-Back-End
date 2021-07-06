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
const database_1 = __importDefault(require("../db/database"));
function createFlashcard({
  owner_id,
  study_set_id,
  block_link,
  front_draft_keys,
  back_draft_keys,
}) {
  return __awaiter(this, void 0, void 0, function* () {
    const now = new Date();
    try {
      const creationResponse = yield database_1
        .default("flashcards")
        .insert({
          owner_id,
          study_set_id,
          block_link,
          date_created: now,
          date_modified: now,
          front_ordering:
            front_draft_keys !== null && front_draft_keys !== void 0
              ? front_draft_keys
              : [],
          back_ordering:
            back_draft_keys !== null && back_draft_keys !== void 0
              ? back_draft_keys
              : [],
        })
        .returning("*");
      return creationResponse;
    } catch (error) {
      console.log(error);
      throw new Error("There was an error creating the flashcard");
    }
  });
}
function getFlashcardsByStudySetId(owner_id, study_set_id) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const flashcards = yield database_1
        .default("flashcards")
        .select("*")
        .where({
          owner_id,
          study_set_id,
        });
      return flashcards;
    } catch (error) {
      console.log(error);
      throw new Error(
        "There was an error fetching flashcards by study pack id"
      );
    }
  });
}
function updateFlashcard({
  id,
  owner_id,
  back_ordering,
  front_ordering,
  block_link,
}) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const flashcard = yield database_1
        .default("flashcards")
        .update({
          back_ordering,
          front_ordering,
          block_link,
          date_modified: new Date(),
        })
        .where({ id, owner_id })
        .returning("*");
      return flashcard;
    } catch (error) {
      console.log(error);
      throw new Error("Error updating flashcard");
    }
  });
}
function deleteFlashcard({ owner_id, id }) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield database_1.default("flashcards").delete("*").where({
        owner_id,
        id,
      });
    } catch (error) {
      console.log(error);
      throw new Error("There was an error deleting flashcard");
    }
  });
}
exports.default = {
  createFlashcard,
  getFlashcardsByStudySetId,
  updateFlashcard,
  deleteFlashcard,
};
