exports.up = function (knex) {
  return knex.schema.table("flashcards", (table) => {
    table.string("status").defaultTo("New").alter();
    table.string("learning_status").defaultTo("New").alter();
  });
};

exports.down = function (knex) {
  return knex.schema.table("flashcards", function (table) {
    table.string("status").alter();
    table.string("learning_status").defaultTo("new").alter();
  });
};
