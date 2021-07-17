exports.up = function (knex) {
  return knex.schema.table("flashcards", (table) => {
    table.string("status").defaultTo("new").notNullable().alter();
    table.integer("quality");
    table.integer("ease_factor").defaultTo(250).notNullable().alter();
    table.integer("failed_attempts").defaultTo(0).notNullable().alter();
    table.integer("interval").defaultTo(0).alter();
  });
};

exports.down = function (knex) {
  return knex.schema.table("flashcards", function (table) {
    table.string("status").defaultTo("new").alter();
    table.integer("quality");
    table.integer("ease_factor").defaultTo(250).alter();
    table.integer("failed_attempts").defaultTo(0).alter();
    table.integer("interval").alter();
  });
};
