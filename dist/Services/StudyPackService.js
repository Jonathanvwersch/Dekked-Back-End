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
exports.default = {
    createStudyPackObject,
    updateStudyPack
};
