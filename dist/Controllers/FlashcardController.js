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
exports.FlashcardController = void 0;
const FlashcardService_1 = __importDefault(require("../Services/FlashcardService"));
const authHelpers_1 = require("../utils/passport/authHelpers");
class FlashcardController {
    getFullFlashcardsByStudyPackId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = authHelpers_1.getUserIdFromRequest(req);
                const { study_pack_id } = req.params;
                const flashcards = yield FlashcardService_1.default.getFullFlashcardsByStudyPackId(study_pack_id, userId);
                return res.status(200).json({
                    success: true,
                    data: {
                        flashcards
                    }
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, error: error.message });
            }
        });
    }
    createFlashCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = authHelpers_1.getUserIdFromRequest(req);
                const { study_pack_id, linked_block, front_blocks, front_draft_keys, back_blocks, back_draft_keys } = req.body;
                const response = yield FlashcardService_1.default.createFlashcard(study_pack_id, userId, linked_block, front_blocks, front_draft_keys, back_blocks, back_draft_keys);
                return res.status(200).json({
                    success: true,
                    data: { flashcard_id: response }
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, error: error.message });
            }
        });
    }
    saveFullFlashcard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = authHelpers_1.getUserIdFromRequest(req);
                const { flash_card_id } = req.params;
                const { front_blocks, front_draft_keys, back_blocks, back_draft_keys } = req.body;
                console.log(front_blocks, front_draft_keys, back_blocks, back_draft_keys);
                yield FlashcardService_1.default.saveFlashcard(flash_card_id, userId, front_blocks, front_draft_keys, back_blocks, back_draft_keys);
                return res.status(200).json({
                    success: true
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, error: error.message });
            }
        });
    }
    deleteFlashcard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = authHelpers_1.getUserIdFromRequest(req);
                const { flash_card_id } = req.params;
                yield FlashcardService_1.default.deleteFlashcard(userId, flash_card_id);
                return res.status(200).json({
                    success: true
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, error: error.message });
            }
        });
    }
}
exports.FlashcardController = FlashcardController;
