"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.StudyPackController = void 0;
const StudyPackModel_1 = require("../Persistance/StudyPackModel");
const PageService_1 = __importDefault(require("../Services/PageService"));
const StudyPackService_1 = __importStar(require("../Services/StudyPackService"));
const authHelpers_1 = require("../utils/passport/authHelpers");
class StudyPackController {
    getStudyPacksByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = authHelpers_1.getUserIdFromRequest(req);
            try {
                const studyPacks = yield StudyPackModel_1.getStudyPacksByUserId(userId);
                const studyPackObject = StudyPackService_1.createStudyPackObject(studyPacks);
                return res.status(200).json({
                    success: true,
                    data: {
                        studyPacks: studyPackObject
                    }
                });
            }
            catch (e) {
                return res.status(400).json({ success: false, error: e.message });
            }
        });
    }
    createStudyPack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = authHelpers_1.getUserIdFromRequest(req);
            const { binder_id, name, color, id } = req.body;
            try {
                const response = yield StudyPackModel_1.createStudyPack(binder_id, name, userId, color, id);
                yield PageService_1.default.createPage(id, undefined, userId);
                return res.status(200).json({
                    success: true,
                    data: {
                        study_pack: response
                    }
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
    updateStudyPack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = authHelpers_1.getUserIdFromRequest(req);
            const { name, color, study_pack_id } = req.body;
            try {
                yield StudyPackService_1.default.updateStudyPack({
                    name,
                    color,
                    study_pack_id,
                    owner_id: userId
                });
                return res.status(200).json({ success: true });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
    deleteStudyPack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = authHelpers_1.getUserIdFromRequest(req);
            const { study_pack_id } = req.body;
            try {
                yield StudyPackService_1.default.deleteStudyPack({
                    study_pack_id,
                    owner_id: userId
                });
                return res.status(200).json({ success: true });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
}
exports.StudyPackController = StudyPackController;
