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
exports.BinderController = void 0;
const BinderModel_1 = require("../Persistance/BinderModel");
const BinderService_1 = require("../Services/BinderService");
const authHelpers_1 = require("../utils/passport/authHelpers");
class BinderController {
    getBindersByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = authHelpers_1.getUserIdFromRequest(req);
            try {
                const binders = yield BinderModel_1.getBindersByUserId(userId);
                const binderObject = BinderService_1.createBinderObject(binders);
                return res.status(200).json({
                    success: true,
                    data: {
                        binders: binderObject
                    }
                });
            }
            catch (e) {
                return res.status(400).json({ success: false, error: e.message });
            }
        });
    }
    createBinder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = authHelpers_1.getUserIdFromRequest(req);
                const { folder_id, name, color } = req.body;
                const response = yield BinderModel_1.createBinder(folder_id, name, userId, color);
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
exports.BinderController = BinderController;
