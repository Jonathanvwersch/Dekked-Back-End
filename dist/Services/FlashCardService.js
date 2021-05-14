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
const BlockModel_1 = __importDefault(require("../Persistance/BlockModel"));
const FlashcardModel_1 = __importDefault(require("../Persistance/FlashcardModel"));
const BlockService_1 = require("./BlockService");
function createFlashcard(study_pack_id, owner_id, block_link) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield FlashcardModel_1.default.createFlashcard({ owner_id, study_pack_id, block_link });
        return result;
    });
}
function getFullFlashcardsByStudyPackId(study_pack_id, owner_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const flashcards = yield FlashcardModel_1.default.getFlashcardsByStudyPackId(owner_id, study_pack_id);
            const fullFlashcards = yield Promise.all(flashcards.map((val) => __awaiter(this, void 0, void 0, function* () {
                const blocksInCard = yield BlockModel_1.default.getBlocksByParentId(study_pack_id);
                const front_blocks = BlockService_1.getOrganizedBlocks(val.front_ordering, blocksInCard);
                const back_blocks = BlockService_1.getOrganizedBlocks(val.back_ordering, blocksInCard);
                return {
                    flashcard: val,
                    front_blocks,
                    back_blocks
                };
            })));
            return fullFlashcards;
        }
        catch (error) {
            console.log(error);
            throw Error('There was an error getting flashcards by studypack id');
        }
    });
}
exports.default = {
    createFlashcard,
    getFullFlashcardsByStudyPackId
};
