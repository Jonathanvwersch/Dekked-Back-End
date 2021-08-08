import knex from "knex";
const knexfile = require("../../knexfile.js");

const env = process.env.APP_ENV!;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const db = knex(knexfile[env]);
export default db;
