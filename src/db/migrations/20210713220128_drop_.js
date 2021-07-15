exports.up = function (knex) {
  return knex.schema.table("flashcards", (table) => {
    table.dropColumn("quality");
  });
};

exports.down = function (knex) {
  return knex.schema.table("flashcards", function (table) {
    table.string("quality");
  });
};
