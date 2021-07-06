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
exports.updateStudySet = exports.getStudySetsByUserId = exports.getStudySetsByBinderId = exports.getStudySetById = exports.createStudySet = void 0;
const database_1 = __importDefault(require("../db/database"));
function createStudySet(binder_id, name, owner_id, color, id) {
  return __awaiter(this, void 0, void 0, function* () {
    const now = new Date();
    try {
      const study_set = yield database_1.default.table("study_sets").insert(
        {
          binder_id,
          name,
          owner_id,
          color,
          id,
          date_created: now,
          date_modified: now,
        },
        ["*"]
      );
      return study_set[0];
    } catch (err) {
      console.log(err);
      throw new Error("There was an error creating binder");
    }
  });
}
exports.createStudySet = createStudySet;
function getStudySetById(id) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const binder = yield database_1.default
        .table("study_sets")
        .select("*")
        .where({ id })
        .first();
      return binder;
    } catch (err) {
      console.log(err);
      throw Error("Error getting study pack by id");
    }
  });
}
exports.getStudySetById = getStudySetById;
function getStudySetsByBinderId(binder_id) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const study_sets = yield database_1.default
        .table("study_sets")
        .select("*")
        .where({ binder_id });
      return study_sets;
    } catch (err) {
      console.log(err);
      throw Error("Error getting study pack by binder id");
    }
  });
}
exports.getStudySetsByBinderId = getStudySetsByBinderId;
function getStudySetsByUserId(user_id) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const binders = yield database_1.default
        .table("study_sets")
        .select("*")
        .where({ owner_id: user_id });
      return binders;
    } catch (err) {
      console.log(err);
      throw Error("Error getting study pack by user id");
    }
  });
}
exports.getStudySetsByUserId = getStudySetsByUserId;
function updateStudySet({ study_set_id, owner_id, color, name }) {
  return __awaiter(this, void 0, void 0, function* () {
    const now = new Date();
    try {
      yield database_1
        .default("study_sets")
        .update({ name, color })
        .where({ id: study_set_id, owner_id, date_modified: now });
    } catch (err) {
      console.log(err);
      throw Error("There was an error updating study pack");
    }
  });
}
exports.updateStudySet = updateStudySet;
function deleteStudySet({ study_set_id, owner_id }) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield database_1
        .default("study_sets")
        .delete("*")
        .where({ id: study_set_id, owner_id });
    } catch (err) {
      console.log(err);
      throw Error("There was an error deleting study pack");
    }
  });
}
exports.default = {
  createStudySet,
  getStudySetById,
  getStudySetsByBinderId,
  updateStudySet,
  deleteStudySet,
};
