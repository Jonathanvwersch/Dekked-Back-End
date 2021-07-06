exports.up = function (knex) {
  return knex.schema.table("flashcards", (table) => {
    table.string("status").defaultTo("new");
    table.integer("quality");
    table.integer("ease_factor").defaultTo(250);
    table.integer("failed_attempts").defaultTo(0);
    table.integer("interval");
  });
};

exports.down = function (knex) {
  return knex.schema.table("flashcards", function (table) {
    table.dropColumn("status");
    table.dropColumn("quality");
    table.dropColumn("ease_factor");
    table.dropColumn("failed_attempts");
    table.dropColumn("interval");
  });
};
