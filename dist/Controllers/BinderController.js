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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinderController = void 0;
const BinderModel_1 = require("../Persistance/BinderModel");
const BinderService_1 = __importStar(require("../Services/BinderService"));
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
    updateBinder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = authHelpers_1.getUserIdFromRequest(req);
            const { name, color, binder_id } = req.body;
            try {
                yield BinderService_1.default.updateBinder({
                    name,
                    color,
                    binder_id,
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
exports.BinderController = BinderController;
