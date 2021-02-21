"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromRequest = exports.comparePass = void 0;
const bcryptjs_1 = require("bcryptjs");
function comparePass(userPassword, databasePassword) {
    return bcryptjs_1.compareSync(userPassword, databasePassword);
}
exports.comparePass = comparePass;
function getUserIdFromRequest(req) {
    const userId = req.user._id;
    return userId;
}
exports.getUserIdFromRequest = getUserIdFromRequest;
