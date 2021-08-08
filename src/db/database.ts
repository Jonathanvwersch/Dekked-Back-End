import knex from "knex";
const knexfile = require("../../knexfile.js");

const env = process.env.NODE_ENV || "development";

const db = knex(knexfile[env]);
export default db;
