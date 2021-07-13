exports.up = function (knex) {
  return knex.schema.table("flashcards", (table) => {
    table.integer("interval").defaultTo(0).alter();
  });
};

exports.down = function (knex) {
  return knex.schema.table("pages", (table) => {
    table.integer("interval").alter();
  });
};
