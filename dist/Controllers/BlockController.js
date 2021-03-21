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
exports.BlockController = void 0;
const BlockModel_1 = __importDefault(require("../Persistance/BlockModel"));
const PageModel_1 = __importDefault(require("../Persistance/PageModel"));
const BlockService_1 = require("../Services/BlockService");
class BlockController {
    getBlocksByPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page_id } = req.params;
                const page = yield PageModel_1.default.getPage(page_id);
                const blocks = yield BlockModel_1.default.getBlocksInPage(page_id);
                const organizedBlocks = BlockService_1.getOrganizedBlocks(page.ordering, blocks);
                return res.status(200).json({
                    success: true,
                    data: { blocks: organizedBlocks }
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
}
exports.BlockController = BlockController;
