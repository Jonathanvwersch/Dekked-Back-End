exports.up = function (knex) {
  return knex.schema.table("pages", (table) => {
    table.dropColumn("title");
  });
};

exports.down = function (knex) {
  return knex.schema.table("pages", function (table) {
    table.string("title").defaultTo("Untitled");
  });
};
