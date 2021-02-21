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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyPackController = void 0;
const StudyPackModel_1 = require("../Persistance/StudyPackModel");
const StudyPackService_1 = require("../Services/StudyPackService");
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
            try {
                const userId = authHelpers_1.getUserIdFromRequest(req);
                const { binder_id, name, color } = req.body;
                const response = yield StudyPackModel_1.createStudyPack(binder_id, name, userId, color);
                return res.status(200).json({
                    success: true,
                    data: {
                        binder: response
                    }
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
}
exports.StudyPackController = StudyPackController;
