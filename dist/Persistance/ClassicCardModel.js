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
function createCard({ deck_id, question, answer }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!deck_id)
            throw new Error('Must specify a deck');
        const response = yield database_1.default
            .table('classic_cards')
            .insert({ deck_id, question, answer })
            .returning('*');
        if (response[0].id) {
            return response[0].id;
        }
        throw new Error('Error creating card');
    });
}
function getCard(card_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!card_id)
            throw new Error('Must specify card');
        const response = yield database_1.default('classic_cards').select('*').where({ card_id });
        if (!response.length)
            throw new Error('Card not found');
        return response[0];
    });
}
function updateCard({ card_id, deck_id, question, answer }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!card_id)
            throw new Error('Must specify card');
        const response = yield database_1.default('classic_cards')
            .update({ deck_id, question, answer })
            .where({ id: card_id });
        console.log(response);
        return response;
    });
}
function deleteCard(card_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!card_id)
            throw new Error('Must specify card');
        const response = yield database_1.default('classic_cards').delete().where({ id: card_id });
        return response;
    });
}
function getCardsInDeck(deck_id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(deck_id);
        const response = yield database_1.default('classic_cards')
            .select('*')
            .where('deck_id', deck_id);
        console.log(response);
        return response;
    });
}
function getAllCards() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default('classic_cards').select('*');
        return response;
    });
}
exports.default = {
    createCard,
    getCard,
    updateCard,
    deleteCard,
    getCardsInDeck,
    getAllCards
};
