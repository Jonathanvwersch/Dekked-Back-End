import knex from 'knex';

const db = knex({
  client: 'pg',
  connection:
    'postgres://dekked_db_user:z6LdOwGN85MDDE5HoZznkViSjUAhwGhp@frankfurt-postgres.render.com/dekked_db?ssl=true'
});

export default db;
