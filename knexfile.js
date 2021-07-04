require("dotenv").config();

const { CLIENT, DB_DEV } = process.env;

module.exports = {
  development: {
    client: CLIENT,
    connection: DB_DEV,
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  },

  production: {
    client: CLIENT,
    connection: DB_DEV,
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
