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
exports.createUser = exports.login = exports.comparePass = void 0;
const bcryptjs_1 = require("bcryptjs");
const UserModel_1 = require("../Persistance/UserModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_2 = require("bcryptjs");
function comparePass(userPassword, databasePassword) {
    return bcryptjs_2.compareSync(userPassword, databasePassword);
}
exports.comparePass = comparePass;
function genToken(user) {
    const token = jsonwebtoken_1.default.sign({ email_address: user.email_address }, 'testing123', {
        expiresIn: 10000000
    });
    return token;
}
function login(email_address, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield UserModel_1.getUserByEmail(email_address);
            if (!user) {
                return {
                    success: false,
                    code: 404,
                    message: 'Incorrect email'
                };
            }
            if (!comparePass(password, user.password)) {
                return {
                    success: false,
                    code: 401,
                    message: 'Incorrect password'
                };
            }
            const token = genToken(user);
            return {
                success: true,
                data: {
                    token,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email_address: email_address,
                    id: user.id
                }
            };
        }
        catch (err) {
            return {
                success: false,
                code: 500,
                message: 'Internal server error'
            };
        }
    });
}
exports.login = login;
function createUser(first_name, last_name, email_address, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield UserModel_1.getUserByEmail(email_address);
            if (foundUser) {
                return {
                    success: false,
                    code: 400,
                    message: 'Email address is already in use'
                };
            }
            const salt = bcryptjs_1.genSaltSync();
            const hash = bcryptjs_1.hashSync(password, salt);
            const user = yield UserModel_1.createNewUser(email_address, first_name, last_name, hash);
            const token = genToken(user);
            return {
                success: true,
                data: {
                    token,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    id: user.id
                }
            };
        }
        catch (err) {
            return {
                success: false,
                message: err,
                code: 500
            };
        }
    });
}
exports.createUser = createUser;
