"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const db = knex_1.default({
    client: 'pg',
    connection: 'postgres://dekked_db_user:z6LdOwGN85MDDE5HoZznkViSjUAhwGhp@frankfurt-postgres.render.com/dekked_db?ssl=true'
});
exports.default = db;
