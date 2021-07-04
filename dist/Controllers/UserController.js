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
exports.UserController = void 0;
const AuthService_1 = require("../Services/AuthService");
const UserService_1 = __importDefault(require("../Services/UserService"));
const authHelpers_1 = require("../utils/passport/authHelpers");
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { first_name, last_name, password, email_address } = req.body;
            try {
                const response = yield AuthService_1.createUser(first_name, last_name, email_address, password);
                if (response.success) {
                    return res.status(200).json(response);
                }
                else {
                    return res.status(response.code).json({
                        success: false,
                        message: response.message
                    });
                }
            }
            catch (e) {
                console.log(e.message);
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, email_address } = req.body;
            try {
                const response = yield AuthService_1.login(email_address, password);
                if (response.success) {
                    return res.status(200).json(response);
                }
                else {
                    return res.status(response.code).json({
                        success: false,
                        message: response.message
                    });
                }
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = authHelpers_1.getUserIdFromRequest(req);
            try {
                const user = yield UserService_1.default.getUserByIdAsync(userId);
                return res.status(200).json({
                    success: true,
                    data: {
                        user
                    }
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, error: error.message });
            }
        });
    }
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = authHelpers_1.getUserIdFromRequest(req);
            const { last_name, first_name, email_address } = req.body;
            try {
                yield UserService_1.default.updateUserAsync({
                    id: userId,
                    last_name,
                    first_name,
                    email_address
                });
                return res.status(200).json({
                    success: true,
                    first_name,
                    last_name,
                    email_address,
                    userId
                });
            }
            catch (error) {
                return res.status(500).json({ success: false, error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
