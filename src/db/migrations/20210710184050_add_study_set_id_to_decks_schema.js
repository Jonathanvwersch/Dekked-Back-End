exports.up = function (knex) {
  return knex.schema.table("decks", (table) => {
    table.uuid("study_set_id").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table("decks", function (table) {
    table.dropColumn("study_set_id");
  });
};
