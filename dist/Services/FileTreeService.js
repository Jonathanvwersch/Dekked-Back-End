"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StudyPackModel_1 = require("../Persistance/StudyPackModel");
const BinderModel_1 = require("../Persistance/BinderModel");
const FolderModel_1 = __importDefault(require("../Persistance/FolderModel"));
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
function createBindersObject(binders, study_packs) {
    let bindersObject = {};
    binders.forEach((val) => {
        bindersObject[val.id] = {
            type: 'binder',
            children: {}
        };
    });
    study_packs.forEach((study_pack) => {
        const binder_id = study_pack.binder_id;
        const study_pack_id = study_pack.id;
        if (bindersObject[binder_id]) {
            bindersObject[binder_id].children[study_pack_id] = { type: 'study_pack', children: {} };
        }
    });
    return bindersObject;
}
function createFolderHierarchyObject(folders) {
    let folderHierarchy = {};
    folders.forEach((folder) => {
        if (!folderHierarchy[folder.id]) {
            folderHierarchy[folder.id] = {
                type: 'folder',
                children: {}
            };
        }
    });
    return folderHierarchy;
}
function createFullHierarchyObject(binders_mapping, binders, folder_hierarchy) {
    let hierarchy = Object.assign({}, folder_hierarchy);
    binders.forEach((binder) => {
        if (hierarchy[binder.folder_id]) {
            hierarchy[binder.folder_id].children[binder.id] = binders_mapping[binder.id];
        }
    });
    return folder_hierarchy;
}
function createFullFileTree(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const folders = yield FolderModel_1.default.getFoldersByUser(user_id);
        const study_packs = yield StudyPackModel_1.getStudyPacksByUserId(user_id);
        const binders = yield BinderModel_1.getBindersByUserId(user_id);
        const folder_hierarchy = createFolderHierarchyObject(folders);
        const binder_hierachy = createBindersObject(binders, study_packs);
        const full_hierarchy = createFullHierarchyObject(binder_hierachy, binders, folder_hierarchy);
        return full_hierarchy;
    });
}
// createFullFileTree('f6dccc9d-4f97-4775-b5a6-eafda9738123');
// test('330831bf-2fc0-42f8-8a48-be7c711fa0cc', [
// '0e52d15d-ee1f-48c7-bdde-b5ec7e05946b'
// ]);
exports.default = {
    createFullFileTree,
    createFolderObject
};
