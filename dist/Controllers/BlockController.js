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
class BlockController {
    createBlock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page_id, draft_key, content, index } = req.body;
                console.log(req.body);
                if (page_id && draft_key && content) {
                    const blockResponse = yield BlockModel_1.default.createBlock(page_id, draft_key, content);
                    let { ordering } = yield PageModel_1.default.getPage(page_id);
                    // New page at index
                    if (index && index < ordering.length) {
                        ordering.splice(index, 0, blockResponse);
                    }
                    else {
                        ordering.push(blockResponse);
                    }
                    const pageUpdateResponse = yield PageModel_1.default.updatePage({ page_id, ordering });
                    if (pageUpdateResponse > 0) {
                        return res.status(200).json({
                            success: true,
                            data: {
                                block_id: blockResponse
                            }
                        });
                    }
                    return res.status(400).json({
                        success: false,
                        error: 'Error updating page'
                    });
                }
                return res
                    .status(400)
                    .json({ success: false, error: 'Fields page_id, content and type are required' });
            }
            catch (e) {
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
}
exports.BlockController = BlockController;
