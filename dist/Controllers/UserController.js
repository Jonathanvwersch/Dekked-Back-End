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
exports.UserController = void 0;
const AuthService_1 = require("../Services/AuthService");
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { first_name, last_name, password, email_address } = req.body;
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
            try {
                const { password, email_address } = req.body;
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
                console.log(e.message);
                return res.status(500).json({ success: false, error: e.message });
            }
        });
    }
}
exports.UserController = UserController;
