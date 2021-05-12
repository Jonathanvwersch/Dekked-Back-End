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
function createPage(study_pack_id, title = 'Untitled', owner_id = 'f6dccc9d-4f97-4775-b5a6-eafda9738123', ordering = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default
            .table('pages')
            .insert({ title, ordering, owner_id, study_pack_id }, ['id']);
        if (response[0].id) {
            return response[0].id;
        }
        throw new Error('Error creating page');
    });
}
function getPage(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default.table('pages').select('*').where('id', id);
        if (response.length) {
            return response[0];
        }
        throw new Error('Page not found!');
    });
}
function updatePage({ page_id, title, ordering }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!page_id)
            throw new Error('Must specify page');
        const response = yield database_1.default('pages').update({ ordering }).where('id', page_id);
        return response;
    });
}
function getPages() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default('pages').select();
        console.log(response);
        return response;
    });
}
function getPageByStudyPackId(study_pack_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default.table('pages').select('*').where({ study_pack_id });
        if (response.length) {
            return response[0];
        }
        throw new Error('Page not found!');
    });
}
function deletePage({ page_id, owner_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield database_1.default('pages').delete().where({ owner_id, id: page_id });
        return response;
    });
}
exports.default = {
    createPage,
    getPage,
    updatePage,
    getPages,
    getPageByStudyPackId,
    deletePage
};
