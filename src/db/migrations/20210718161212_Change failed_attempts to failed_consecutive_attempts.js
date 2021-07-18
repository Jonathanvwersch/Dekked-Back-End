exports.up = function (knex) {
  return knex.schema.table("flashcards", (table) => {
    table.renameColumn("failed_attempts", "failed_consecutive_attempts");
  });
};

exports.down = function (knex) {
  return knex.schema.table("flashcards", (table) => {
    table.renameColumn("failed_consecutive_attempts", "failed_attempts");
  });
};
