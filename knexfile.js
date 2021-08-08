require("dotenv").config();

module.exports = {
  development: {
    client: process.env.CLIENT,
    connection: process.env.DB_INTEGRATION,
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  },

  test: {
    client: process.env.CLIENT,
    connection: process.env.DB_INTEGRATION,
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
    connection: process.env.DB_PRODUCTION,
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
