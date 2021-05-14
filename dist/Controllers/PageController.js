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
exports.PageController = void 0;
const BlockModel_1 = __importDefault(require("../Persistance/BlockModel"));
const PageModel_1 = __importDefault(require("../Persistance/PageModel"));
const BlockService_1 = require("../Services/BlockService");
const PageService_1 = __importDefault(require("../Services/PageService"));
const authHelpers_1 = require("../utils/passport/authHelpers");
class PageController {
    // public async createPage(
    //   req: express.Request,
    //   res: express.Response
    // ): Promise<express.Response<any>> {
    //   try {
    //     const { title } = req.body;
    //     console.log('HERE');
    //     const response = await PageModel.createPage(title);
    //     return res.status(200).json({
    //       success: true,
    //       data: { page_id: response }
    //     });
    //   } catch (e) {
    //     console.log(e);
    //     return res.status(500).json({ success: false, error: e.message });
    //   }
    // }
    getFullPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page_id } = req.params;
                const page = yield PageModel_1.default.getPage(page_id);
                const blocks = yield BlockModel_1.default.getBlocksByParentId(page_id);
                const organizedBlocks = BlockService_1.getOrganizedBlocks(page.ordering, blocks);
                return res.status(200).json({
                    success: true,
                    data: { page, organizedBlocks }
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
    getPageMeta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page_id } = req.params;
                const response = yield PageModel_1.default.getPage(page_id);
                return res.status(200).json({
                    success: true,
                    data: response
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
    saveFullPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('HERER');
                const { page_id } = req.params;
                const userId = authHelpers_1.getUserIdFromRequest(req);
                const { blocks, draft_keys } = req.body;
                yield BlockService_1.saveBlocks(blocks, page_id, draft_keys, userId);
                yield PageModel_1.default.updatePage({ page_id, ordering: draft_keys });
                return res.status(200).json({ success: true });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
    updatePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield PageModel_1.default.updatePage(req.body);
                return res.status(200).json({
                    success: true,
                    data: response
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
    getPages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield PageModel_1.default.getPages();
                return res.status(200).json({
                    success: true,
                    data: {
                        pages: response
                    }
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
    getPageByStudyPackId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { study_pack_id } = req.params;
                const response = yield PageService_1.default.getPageByStudyPackIdAsync(study_pack_id);
                return res.status(200).json({
                    success: true,
                    data: {
                        page: response
                    }
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
}
exports.PageController = PageController;
