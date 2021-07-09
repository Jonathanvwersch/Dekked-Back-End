import knex from "knex";
const knexfile = require("../../knexfile.js");

const env = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
const db = knex(knexfile[env]);
export default db;
