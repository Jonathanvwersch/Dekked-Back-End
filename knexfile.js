require("dotenv").config();
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  development: {
    client: process.env.CLIENT,
    connection: process.env.DB_CONNECTION,
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  },

  integration: {
    client: process.env.CLIENT,
    connection: process.env.DB_CONNECTION,
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  staging: {
    client: process.env.CLIENT,
    connection: process.env.DB_CONNECTION,
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: process.env.CLIENT,
    connection: process.env.DB_CONNECTION,
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
