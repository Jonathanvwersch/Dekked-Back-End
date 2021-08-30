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
    pool: {
      min: 0,
      max: 10,
      createTimeoutMillis: 60000,
      acquireTimeoutMillis: 60000,
      idleTimeoutMillis: 60000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
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
      min: 0,
      max: 10,
      createTimeoutMillis: 60000,
      acquireTimeoutMillis: 60000,
      idleTimeoutMillis: 60000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
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
      min: 0,
      max: 10,
      createTimeoutMillis: 60000,
      acquireTimeoutMillis: 60000,
      idleTimeoutMillis: 60000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
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
      min: 0,
      max: 10,
      createTimeoutMillis: 60000,
      acquireTimeoutMillis: 60000,
      idleTimeoutMillis: 60000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },
  },
};
