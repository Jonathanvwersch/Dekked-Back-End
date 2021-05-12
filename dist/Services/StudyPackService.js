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
exports.createStudyPackObject = void 0;
const StudyPackModel_1 = __importDefault(require("../Persistance/StudyPackModel"));
const PageService_1 = __importDefault(require("./PageService"));
function createStudyPackObject(study_packs) {
    let studyPackObject = {};
    study_packs.forEach((val) => {
        studyPackObject[val.id] = val;
    });
    return studyPackObject;
}
exports.createStudyPackObject = createStudyPackObject;
function updateStudyPack({ color, name, study_pack_id, owner_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield StudyPackModel_1.default.updateStudyPack({ color, name, study_pack_id, owner_id });
    });
}
function deleteStudyPack({ study_pack_id, owner_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield StudyPackModel_1.default.deleteStudyPack({ owner_id, study_pack_id });
            const page = yield PageService_1.default.getPageByStudyPackIdAsync(study_pack_id);
            yield PageService_1.default.deletePage(page.id, owner_id);
        }
        catch (error) {
            console.log(error);
            throw new Error('There was an error deleting the study pack');
        }
    });
}
function getStudyPacksByBinderId(binder_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studyPacks = yield StudyPackModel_1.default.getStudyPacksByBinderId(binder_id);
            return studyPacks;
        }
        catch (err) {
            throw new Error('There was an error getting study packs by binder id');
        }
    });
}
exports.default = {
    createStudyPackObject,
    updateStudyPack,
    deleteStudyPack,
    getStudyPacksByBinderId
};
