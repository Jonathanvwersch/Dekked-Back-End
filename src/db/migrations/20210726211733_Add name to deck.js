exports.up = function (knex) {
  return knex.schema.table("decks", (table) => {
    table.string("name");
  });
};

exports.down = function (knex) {
  return knex.schema.table("flashcards", function (table) {
    table.dropColumn("name");
  });
};
