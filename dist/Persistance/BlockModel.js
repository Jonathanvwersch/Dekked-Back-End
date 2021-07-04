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
const database_1 = __importDefault(require("../db/database"));
function createBlock(parent_id, draft_key, content, owner_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default
            .table("blocks")
            .insert({ parent_id, draft_key, content, owner_id }, ["id"]);
        if (response[0].id) {
            return response[0].id;
        }
        throw new Error("There was an error creating the block");
    });
}
function getBlock(parent_id, draft_key) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default
            .table("blocks")
            .select("*")
            .where({ draft_key, parent_id });
        if (response.length) {
            return response[0];
        }
        throw new Error("No block was found");
    });
}
function updateBlock({ parent_id, draft_key, content, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default
            .table("blocks")
            .update({ content })
            .where({ draft_key, parent_id });
        return response;
    });
}
function getBlocksByParentId(parent_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default
            .table("blocks")
            .select("*")
            .where({ parent_id });
        return response;
    });
}
function deleteBlock(id, owner_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.default.table("blocks").delete("*").where({ id, owner_id });
        }
        catch (error) {
            throw Error("There was an error deleting block");
        }
    });
}
exports.default = {
    createBlock,
    getBlock,
    updateBlock,
    getBlocksByParentId,
    deleteBlock,
};
