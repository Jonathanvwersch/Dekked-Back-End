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
exports.getBlocksInPage = exports.deleteBlock = exports.getOrganizedBlocks = exports.saveBlocks = exports.checkBlockExists = void 0;
const BlockModel_1 = __importDefault(require("../Persistance/BlockModel"));
function checkBlockExists(page_id, draft_key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield BlockModel_1.default.getBlock(page_id, draft_key);
            return true;
        }
        catch (error) {
            return false;
        }
    });
}
exports.checkBlockExists = checkBlockExists;
function saveOrCreateBlock(block, draft_key, page_id, owner_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const exists = yield checkBlockExists(page_id, draft_key);
        if (exists) {
            const response = yield BlockModel_1.default.updateBlock({ page_id, draft_key, content: block });
            return response;
        }
        else {
            const response = yield BlockModel_1.default.createBlock(page_id, draft_key, block, owner_id);
            return response;
        }
    });
}
function saveBlocks(blocks, page_id, draft_keys, owner_id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(blocks, page_id, draft_keys);
        for (let i = 0; i < blocks.length; i++) {
            yield saveOrCreateBlock(blocks[i], draft_keys[i], page_id, owner_id);
        }
    });
}
exports.saveBlocks = saveBlocks;
function getOrganizedBlocks(ordering, blocks) {
    let orderingMap = {};
    blocks.forEach((val) => (orderingMap[val.draft_key] = val.content));
    const orderedBlocks = ordering.map((val) => {
        return orderingMap[val];
    });
    return orderedBlocks;
}
exports.getOrganizedBlocks = getOrganizedBlocks;
function deleteBlock(block_id, owner_id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield BlockModel_1.default.deleteBlock(block_id, owner_id);
    });
}
exports.deleteBlock = deleteBlock;
function getBlocksInPage(page_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const blocks = yield BlockModel_1.default.getBlocksInPage(page_id);
        return blocks;
    });
}
exports.getBlocksInPage = getBlocksInPage;
exports.default = {
    getBlocksInPage,
    deleteBlock
};
