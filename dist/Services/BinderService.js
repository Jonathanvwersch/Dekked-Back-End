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
exports.createBinderObject = void 0;
const BinderModel_1 = __importDefault(require("../Persistance/BinderModel"));
const StudySetService_1 = __importDefault(require("./StudySetService"));
function createBinderObject(binders) {
  let binderObject = {};
  binders.forEach((val) => {
    binderObject[val.id] = val;
  });
  return binderObject;
}
exports.createBinderObject = createBinderObject;
function updateBinder({ color, name, binder_id, owner_id }) {
  return __awaiter(this, void 0, void 0, function* () {
    yield BinderModel_1.default.updateBinder({
      color,
      name,
      binder_id,
      owner_id,
    });
  });
}
function deleteBinder({ binder_id, owner_id }) {
  return __awaiter(this, void 0, void 0, function* () {
    const study_sets = yield StudySetService_1.default.getStudySetsByBinderId(
      binder_id
    );
    yield Promise.all(
      study_sets.map((val) =>
        __awaiter(this, void 0, void 0, function* () {
          return StudySetService_1.default.deleteStudySet({
            study_set_id: val.id,
            owner_id,
          });
        })
      )
    );
    yield BinderModel_1.default.deleteBinder({ binder_id, owner_id });
  });
}
function getBindersByFolderId(folder_id, owner_id) {
  return __awaiter(this, void 0, void 0, function* () {
    return yield BinderModel_1.default.getBindersByFolderId(
      owner_id,
      folder_id
    );
  });
}
exports.default = {
  createBinderObject,
  updateBinder,
  deleteBinder,
  getBindersByFolderId,
};
