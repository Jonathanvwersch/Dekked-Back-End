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
const FolderModel_1 = __importDefault(require("../Persistance/FolderModel"));
const BinderService_1 = __importDefault(require("./BinderService"));
function getFolderObject(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const folders = yield FolderModel_1.default.getFoldersByUser(user_id);
        let folderObject = {};
        folders.forEach((folder) => {
            folderObject[folder.id] = folder;
        });
        return folderObject;
    });
}
function updateFolder({ color, name, folder_id, owner_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield FolderModel_1.default.updateFolder({ color, name, folder_id, owner_id });
    });
}
function deleteFolder(folder_id, owner_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const binders = yield BinderService_1.default.getBindersByFolderId(folder_id, owner_id);
        yield Promise.all(binders.map((val) => BinderService_1.default.deleteBinder({ binder_id: val.id, owner_id })));
        yield FolderModel_1.default.deleteFolder({ folder_id, owner_id });
    });
}
exports.default = {
    getFolderObject,
    updateFolder,
    deleteFolder
};
