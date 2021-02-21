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
function createNewMultipleChoice(question, answer, choices, notes, deck_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default
            .table('multiple_choice')
            .insert({ question, answer, choices, notes, deck_id }, ['id']);
        return response[0];
    });
}
function getAllCardsInDeck(deck_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default('multiple_choice').select('*').where({ deck_id: deck_id });
        return response;
    });
}
