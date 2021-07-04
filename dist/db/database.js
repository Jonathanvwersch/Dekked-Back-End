"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile = require('../../knexfile.js');
const env = process.env.NODE_ENV || 'development';
const db = knex_1.default(knexfile[env]);
exports.default = db;
