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
const database_1 = __importDefault(require("./database"));
function createFolder(name, owner_id, color) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const now = new Date();
            const creationResponse = yield database_1.default('folders')
                .insert({
                name,
                owner_id,
                color,
                date_created: now,
                date_modified: now
            })
                .returning('id');
            return creationResponse[0];
        }
        catch (error) {
            console.log(error);
            throw new Error('There was an error creating folder');
        }
    });
}
function getFoldersByUser(owner_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield database_1.default('folders').select('*').where({ owner_id });
            return response;
        }
        catch (error) {
            console.log(error);
            throw new Error('There was fetching folders for given user');
        }
    });
}
// async function deleteAllChildren(folder_id: string, owner_id: string) {
//   if (folder_id === 'ROOT') {
//     throw new Error('ROOT folder cannot be deleted');
//   }
//   const folderResponse: FolderInterface[] = await db('folders')
//     .select('*')
//     .where({ id: folder_id });
//   if (folderResponse.length) {
//     return await db('folders')
//       .delete('*')
//       .whereRaw('? @> path AND owner_id = ? ', [folderResponse[0].path, owner_id]);
//   } else {
//     throw new Error('Folder not found');
//   }
// }
// async function moveFolder(target_folder_id: string, folder_id: string, owner_id: string) {
//   if (folder_id === 'ROOT') {
//     throw new Error('ROOT folder cannot be moved');
//   }
//   if (folder_id === target_folder_id) {
//     throw new Error('Target and source are the same');
//   }
//   if (target_folder_id === 'ROOT') {
//     const folderResponse: FolderInterface[] = await db('folders')
//       .select('*')
//       .where({ id: folder_id, owner_id });
//     if (!folderResponse.length) throw new Error('Could not find folder');
//     await db.raw('UPDATE folders SET path = ? || subpath(path, nlevel(?)-1)where path <@ ?', [
//       'ROOT',
//       folderResponse[0].path,
//       folderResponse[0].path
//     ]);
//   } else {
//     const folderResponse: FolderInterface[] = await db('folders')
//       .select('*')
//       .where({ id: folder_id, owner_id });
//     const targetResponse: FolderInterface[] = await db('folders')
//       .select('*')
//       .where({ id: target_folder_id, owner_id });
//     if (!folderResponse.length) throw new Error('Could not find folder');
//     if (!targetResponse.length) throw new Error('Could not find target folder');
//     if (targetResponse[0].path.includes(folderResponse[0].id.replace(/-/g, '')))
//       throw new Error('Cannot move folder within itself');
//     await db.raw('UPDATE folders SET path = ? || subpath(path, nlevel(?)-1) WHERE path <@ ?', [
//       targetResponse[0].path,
//       folderResponse[0].path,
//       folderResponse[0].path
//     ]);
//   }
// }
exports.default = {
    createFolder,
    getFoldersByUser
};
