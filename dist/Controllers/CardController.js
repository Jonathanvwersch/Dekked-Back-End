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
exports.CardController = void 0;
const ClassicCardModel_1 = __importDefault(require("../Persistance/ClassicCardModel"));
class CardController {
    createCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, cardData } = req.body;
            console.log(req.body);
            try {
                if (type && cardData && cardData) {
                    if (type === 'classic') {
                        const response = yield ClassicCardModel_1.default.createCard(cardData);
                        return res.status(200).json({
                            success: true,
                            data: response
                        });
                    }
                    else {
                        return res.status(400).json({
                            success: false,
                            error: 'Type ' + type + ' not implemented'
                        });
                    }
                }
                else {
                    return res
                        .status(400)
                        .json({ success: false, error: 'Properties not found, type and cardData not found' });
                }
            }
            catch (e) {
                return res.status(400).json({ success: false, error: e.message });
            }
        });
    }
    getCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.card_id) {
                    const response = yield ClassicCardModel_1.default.getCard(req.params.card_id);
                    return res.status(200).json({
                        success: true,
                        data: response
                    });
                }
                else {
                    return res.status(400).json({ success: false, error: 'Property card_id not found' });
                }
            }
            catch (e) {
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
    updateCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.card_id)
                    return res.status(400).json({ success: false, error: 'Property card_id not found' });
                const response = yield ClassicCardModel_1.default.updateCard(req.body);
                if (!response) {
                    return res.status(404).json({ success: false, error: 'Card not found' });
                }
                return res.status(200).json({ success: true });
            }
            catch (e) {
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
    deleteCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.card_id)
                    return res.status(400).json({ success: false, error: 'Property card_id not found' });
                const response = yield ClassicCardModel_1.default.deleteCard(req.body.deck_id);
                if (!response)
                    return res.status(404).json({ success: false, error: 'Card not found' });
                return res.status(200).json({ success: true });
            }
            catch (e) {
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
    getCardsInDeck(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.deck_id) {
                    return res.status(400).json({ success: false, error: 'Property deck_id not found' });
                }
                const response = yield ClassicCardModel_1.default.getCardsInDeck(req.params.deck_id);
                console.log(response);
                return res.status(200).json({ success: true, data: response });
            }
            catch (e) {
                console.log(e.message);
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
}
exports.CardController = CardController;
