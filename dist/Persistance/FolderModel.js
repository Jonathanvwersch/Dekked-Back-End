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
exports.getFoldersByUser = void 0;
const database_1 = __importDefault(require("../db/database"));
function createFolder(name, owner_id, color, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        try {
            const folders = yield database_1.default("folders")
                .insert({
                name,
                owner_id,
                color,
                date_created: now,
                date_modified: now,
                id,
            })
                .returning("id");
            return folders[0];
        }
        catch (error) {
            console.log(error);
            throw new Error("There was an error creating folder");
        }
    });
}
function getFoldersByUser(owner_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield database_1.default("folders")
                .select("*")
                .where({ owner_id });
            return response;
        }
        catch (error) {
            console.log(error);
            throw new Error("There was fetching folders for given user");
        }
    });
}
exports.getFoldersByUser = getFoldersByUser;
function updateFolder({ name, color, folder_id, owner_id, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        try {
            yield database_1.default("folders")
                .update({ name, color, date_modified: now })
                .where({ id: folder_id, owner_id });
        }
        catch (err) {
            console.log(err);
            throw Error("There was an error updating folder");
        }
    });
}
function deleteFolder({ folder_id, owner_id, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.default("folders").delete("*").where({ id: folder_id, owner_id });
        }
        catch (err) {
            console.log(err);
            throw Error("There was an error deleting folder");
        }
    });
}
exports.default = {
    createFolder,
    getFoldersByUser,
    updateFolder,
    deleteFolder,
};
