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
exports.updateStudyPack = exports.getStudyPacksByUserId = exports.getStudyPacksByBinderId = exports.getStudyPackById = exports.createStudyPack = void 0;
const database_1 = __importDefault(require("./database"));
function createStudyPack(binder_id, name, owner_id, color) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log({ binder_id, name, owner_id, color });
        try {
            const study_pack = yield database_1.default
                .table('study_packs')
                .insert({ binder_id, name, owner_id, color }, ['*']);
            console.log(study_pack);
            return study_pack[0];
        }
        catch (err) {
            console.log(err);
            throw new Error('There was an error creating binder');
        }
    });
}
exports.createStudyPack = createStudyPack;
function getStudyPackById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const binder = yield database_1.default
                .table('study_packs')
                .select('*')
                .where({ id })
                .first();
            return binder;
        }
        catch (err) {
            console.log(err);
            throw Error('Error getting study pack by id');
        }
    });
}
exports.getStudyPackById = getStudyPackById;
function getStudyPacksByBinderId(binder_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const binders = yield database_1.default
                .table('study_packs')
                .select('*')
                .where({ binder_id });
            return binders;
        }
        catch (err) {
            console.log(err);
            throw Error('Error getting study pack by binder id');
        }
    });
}
exports.getStudyPacksByBinderId = getStudyPacksByBinderId;
function getStudyPacksByUserId(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const binders = yield database_1.default
                .table('study_packs')
                .select('*')
                .where({ owner_id: user_id });
            return binders;
        }
        catch (err) {
            console.log(err);
            throw Error('Error getting study pack by user id');
        }
    });
}
exports.getStudyPacksByUserId = getStudyPacksByUserId;
function updateStudyPack({ study_pack_id, owner_id, color, name }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.default('study_packs').update({ name, color }).where({ id: study_pack_id, owner_id });
        }
        catch (err) {
            console.log(err);
            throw Error('There was an error updating study pack');
        }
    });
}
exports.updateStudyPack = updateStudyPack;
exports.default = {
    createStudyPack,
    getStudyPackById,
    getStudyPacksByBinderId,
    updateStudyPack
};
