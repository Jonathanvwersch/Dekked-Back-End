require("dotenv").config();

const { CLIENT, DB_PRODUCTION, DB_INTEGRATION } = process.env;

module.exports = {
  development: {
    client: CLIENT,
    connection: DB_INTEGRATION,
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  },

  integration: {
    client: CLIENT,
    connection: DB_INTEGRATION,
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
    client: CLIENT,
    connection: DB_PRODUCTION,
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
