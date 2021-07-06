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
exports.createStudySetObject = void 0;
const StudySetModel_1 = __importDefault(
  require("../Persistance/StudySetModel")
);
const PageService_1 = __importDefault(require("./PageService"));
function createStudySetObject(study_sets) {
  let studyPackObject = {};
  study_sets.forEach((val) => {
    studyPackObject[val.id] = val;
  });
  return studyPackObject;
}
exports.createStudySetObject = createStudySetObject;
function updateStudySet({ color, name, study_set_id, owner_id }) {
  return __awaiter(this, void 0, void 0, function* () {
    yield StudySetModel_1.default.updateStudySet({
      color,
      name,
      study_set_id,
      owner_id,
    });
  });
}
function deleteStudySet({ study_set_id, owner_id }) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield StudySetModel_1.default.deleteStudySet({
        owner_id,
        study_set_id,
      });
      const page = yield PageService_1.default.getPageByStudySetIdAsync(
        study_set_id
      );
      yield PageService_1.default.deletePage(page.id, owner_id);
    } catch (error) {
      console.log(error);
      throw new Error("There was an error deleting the study pack");
    }
  });
}
function getStudySetsByBinderId(binder_id) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const studySets = yield StudySetModel_1.default.getStudySetsByBinderId(
        binder_id
      );
      return studySets;
    } catch (err) {
      throw new Error("There was an error getting study packs by binder id");
    }
  });
}
exports.default = {
  createStudySetObject,
  updateStudySet,
  deleteStudySet,
  getStudySetsByBinderId,
};
