require("dotenv").config({ path: `./.env.${process.env.ENV}` });

module.exports = {
  development: {
    client: "pg",
    connection:
      "postgres://dekked_db_user:z6LdOwGN85MDDE5HoZznkViSjUAhwGhp@frankfurt-postgres.render.com/dekked_db?ssl=true",
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  },

  integration: {
    client: "pg",
    connection:
      "postgres://dekked_db_user:z6LdOwGN85MDDE5HoZznkViSjUAhwGhp@frankfurt-postgres.render.com/dekked_db?ssl=true",
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
    client: "pg",
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
