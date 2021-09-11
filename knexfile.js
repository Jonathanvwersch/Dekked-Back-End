require("dotenv").config();
const pg = require("pg");
pg.defaults.ssl = true;

const poolConfig = {
  min: 0,
  max: 10,
  createTimeoutMillis: 60000,
  acquireTimeoutMillis: 60000,
  idleTimeoutMillis: 600000,
};

const environmentProperties = {
  client: process.env.CLIENT,
  connection: process.env.DB_CONNECTION,
  migrations: {
    directory: __dirname + "/src/db/migrations",
  },
  seeds: {
    directory: __dirname + "/src/db/seeds",
  },
  pool: {
    ...poolConfig,
  },
};

module.exports = {
  development: {
    ...environmentProperties,
  },

  integration: {
    ...environmentProperties,
  },

  staging: {
    ...environmentProperties,
  },

  production: {
    ...environmentProperties,
  },
};
