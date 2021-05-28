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
const PageModel_1 = __importDefault(require("../Persistance/PageModel"));
const BlockService_1 = __importDefault(require("./BlockService"));
function getPageByStudyPackIdAsync(study_pack_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield PageModel_1.default.getPageByStudyPackId(study_pack_id);
            return result;
        }
        catch (error) {
            console.log(error);
            throw new Error('There was an error fetching page');
        }
    });
}
function createPage(study_pack_id, title, owner_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield PageModel_1.default.createPage(study_pack_id, title, owner_id);
            return result;
        }
        catch (error) {
            console.log(error);
            throw new Error('There was an error creating page');
        }
    });
}
function deletePage(page_id, owner_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const blocks = yield BlockService_1.default.getBlocksInParent(page_id);
            yield Promise.all(blocks.map((val) => __awaiter(this, void 0, void 0, function* () { return BlockService_1.default.deleteBlock(val.id, owner_id); })));
            yield PageModel_1.default.deletePage({ page_id, owner_id });
        }
        catch (e) {
            console.log(e);
            throw new Error('There was an error deleting page');
        }
    });
}
exports.default = {
    getPageByStudyPackIdAsync,
    createPage,
    deletePage
};
