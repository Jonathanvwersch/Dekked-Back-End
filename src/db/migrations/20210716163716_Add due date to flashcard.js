exports.up = function (knex) {
  return knex.schema.table("flashcards", (table) => {
    table.dateTime("due_date");
  });
};

exports.down = function (knex) {
  return knex.schema.table("flashcards", function (table) {
    table.dropColumn("due_date");
  });
};
