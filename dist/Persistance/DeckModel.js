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
function createDeck({ folder_id, name }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default.table('decks').insert({ name, folder_id }, ['id']);
        if (response[0].id) {
            return response[0].id;
        }
        throw new Error('Error creating deck');
    });
}
function getDeck(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default.table('decks').select('*').where('id', id);
        if (response.length) {
            return response[0];
        }
        throw new Error('Deck not found!');
    });
}
function getAllDecks() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default.table('decks').select('*');
        return response;
    });
}
function updateDeck({ deck_id, name, folder_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!deck_id)
            throw new Error('Must specify deck');
        const response = yield database_1.default('decks').update({ folder_id, name }).where({ id: deck_id });
        console.log(response);
        return response;
    });
}
function deleteDeck(deck_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default('decks').delete().where({ id: deck_id });
        return response;
    });
}
function getDecksInFolder(folder_id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(folder_id);
        const response = yield database_1.default('decks')
            .select('*')
            .where('folder_id', folder_id);
        console.log(response);
        return response;
    });
}
// createDeck({ folder_id: '6b13d0a1-f5af-45d7-a674-e83c81af7175', name: 'The nervous system' });
// getDeck('cc0a3fb5-9af2-4d67-85da-9accc4ea88a2');
// getAllDecksInFolder('d2a2f0a5-b619-4d33-8866-5dc6b7c26810');
exports.default = {
    createDeck,
    getDeck,
    deleteDeck,
    updateDeck,
    getDecksInFolder,
    getAllDecks
};
