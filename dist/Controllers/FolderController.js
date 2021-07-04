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
exports.FolderController = void 0;
const FolderModel_1 = __importDefault(require("../Persistance/FolderModel"));
const authHelpers_1 = require("../utils/passport/authHelpers");
const FolderService_1 = __importDefault(require("../Services/FolderService"));
class FolderController {
    getFolders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = authHelpers_1.getUserIdFromRequest(req);
            try {
                const folders = yield FolderService_1.default.getFolderObject(userId);
                return res.status(200).json({ success: true, data: { folders } });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
    createFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, color, id } = req.body;
            const userId = authHelpers_1.getUserIdFromRequest(req);
            try {
                const folder = yield FolderModel_1.default.createFolder(name, userId, color, id);
                res.status(200).json({
                    success: true,
                    folder
                });
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ success: false, error: e.message });
            }
        });
    }
    updateFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = authHelpers_1.getUserIdFromRequest(req);
            const { name, color, folder_id } = req.body;
            try {
                const folder = yield FolderService_1.default.updateFolder({
                    name,
                    color,
                    folder_id,
                    owner_id: userId
                });
                return res.status(200).json({ success: true, folder });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
    deleteFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = authHelpers_1.getUserIdFromRequest(req);
            const { folder_id } = req.body;
            try {
                yield FolderService_1.default.deleteFolder(folder_id, userId);
                return res.status(200).json({ success: true });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
}
exports.FolderController = FolderController;
