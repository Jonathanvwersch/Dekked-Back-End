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
exports.updateUser = exports.createNewUser = exports.getUserByEmail = exports.getUserById = void 0;
const database_1 = __importDefault(require("../db/database"));
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield database_1.default.table("users").where({ id }).first();
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getUserById = getUserById;
function getUserByEmail(email_address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield database_1.default
                .table("users")
                .where({ email_address })
                .first();
            return user;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
}
exports.getUserByEmail = getUserByEmail;
function createNewUser(email_address, first_name, last_name, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.default
                .table("users")
                .insert({ email_address, first_name, last_name, password });
            const user = yield getUserByEmail(email_address);
            return user;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
exports.createNewUser = createNewUser;
function updateUser({ id, first_name, last_name, email_address, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.default
                .table("users")
                .update({ email_address, first_name, last_name })
                .where({ id });
        }
        catch (error) {
            console.log(error);
            throw new Error("Error updating user");
        }
    });
}
exports.updateUser = updateUser;
