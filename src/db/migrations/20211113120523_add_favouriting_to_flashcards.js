exports.up = function (knex) {
  return knex.schema.table("flashcards", (table) => {
    table.boolean("starred").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table("flashcards", function (table) {
    table.dropColumn("starred");
  });
};
