exports.up = function (knex) {
  return knex.schema.table("flashcards", (table) => {
    table.uuid("deck_id");
  });
};

exports.down = function (knex) {
  return knex.schema.table("flashcards", function (table) {
    table.dropColumn("deck_id");
  });
};
