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
const StudySetModel_1 = require("../Persistance/StudySetModel");
const BinderModel_1 = require("../Persistance/BinderModel");
const FolderModel_1 = __importDefault(require("../Persistance/FolderModel"));
const types_1 = require("../types");
function createFolderObject(folders) {
  let folderObject = {};
  for (let i = 0; i < folders.length; i++) {
    const prop = folders[i].id;
    if (!folderObject[prop]) {
      folderObject[prop] = folders[i];
    }
  }
  return folderObject;
}
function createBindersObject(binders, study_sets) {
  let bindersObject = {};
  binders.forEach((val) => {
    bindersObject[val.id] = {
      type: types_1.FILETREE_TYPES.BINDER,
      folder_id: val.folder_id,
      id: val.id,
      name: val.name,
      owner_id: val.owner_id,
      color: val.color,
      children: {},
    };
  });
  study_sets.forEach((study_set) => {
    var _a;
    const binder_id = study_set.binder_id;
    const study_set_id = study_set.id;
    if (bindersObject[binder_id]) {
      const folderId =
        (_a =
          bindersObject === null || bindersObject === void 0
            ? void 0
            : bindersObject[binder_id]) === null || _a === void 0
          ? void 0
          : _a.folder_id;
      bindersObject[binder_id].children[study_set_id] = {
        type: types_1.FILETREE_TYPES.STUDY_PACK,
        binder_id: binder_id,
        folder_id: folderId,
        id: study_set_id,
        owner_id: study_set.owner_id,
        name: study_set.name,
        color: study_set.color,
        children: {},
      };
    }
  });
  return bindersObject;
}
function createFolderHierarchyObject(folders) {
  let folderHierarchy = {};
  folders.forEach((folder) => {
    if (!folderHierarchy[folder.id]) {
      folderHierarchy[folder.id] = {
        type: types_1.FILETREE_TYPES.FOLDER,
        id: folder.id,
        color: folder.color,
        date_created: folder.date_created,
        date_modified: folder.date_modified,
        name: folder.name,
        owner_id: folder.owner_id,
        children: {},
      };
    }
  });
  return folderHierarchy;
}
function createFullHierarchyObject(binders_mapping, binders, folder_hierarchy) {
  let hierarchy = Object.assign({}, folder_hierarchy);
  binders.forEach((binder) => {
    if (hierarchy[binder.folder_id]) {
      hierarchy[binder.folder_id].children[binder.id] =
        binders_mapping[binder.id];
    }
  });
  return folder_hierarchy;
}
function createFullFileTree(user_id) {
  return __awaiter(this, void 0, void 0, function* () {
    const folders = yield FolderModel_1.default.getFoldersByUser(user_id);
    const study_sets = yield StudySetModel_1.getStudySetsByUserId(user_id);
    const binders = yield BinderModel_1.getBindersByUserId(user_id);
    const folder_hierarchy = createFolderHierarchyObject(folders);
    const binder_hierachy = createBindersObject(binders, study_sets);
    const full_hierarchy = createFullHierarchyObject(
      binder_hierachy,
      binders,
      folder_hierarchy
    );
    return full_hierarchy;
  });
}
exports.default = {
  createFullFileTree,
  createFolderObject,
};
