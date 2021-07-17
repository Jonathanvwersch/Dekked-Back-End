exports.up = function (knex) {
  return knex.schema.table("flashcards", (table) => {
    table.string("learning_status").defaultTo("New");
  });
};

exports.down = function (knex) {
  return knex.schema.table("flashcards", function (table) {
    table.dropColumn("learning_status");
  });
};
