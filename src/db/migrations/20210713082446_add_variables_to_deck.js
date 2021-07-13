exports.up = function (knex) {
  return knex.schema.table("decks", (table) => {
    table.integer("easy_bonus").defaultTo(130);
    table.integer("interval_modifier").defaultTo(100);
    table.integer("new_interval").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.table("decks", function (table) {
    table.dropColumn("easy_bonus");
    table.dropColumn("interval_modifier");
    table.dropColumn("new_interval");
  });
};
