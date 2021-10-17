exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.specificType("recently_visited", "text[]");
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", function (table) {
    table.dropColumn("recently_visited", "recently_visited");
  });
};
