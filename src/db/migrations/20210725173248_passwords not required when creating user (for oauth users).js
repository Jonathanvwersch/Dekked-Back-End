exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("password").alter();
  });
};

exports.down = function (knex) {
  return knex.schema.table("flashcards", function (table) {
    table.string("password").notNullable().alter();
  });
};
