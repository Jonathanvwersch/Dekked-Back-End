import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: 'postgresql://dekked_user:tango@localhost:5432/dekked'
});

export default db;
