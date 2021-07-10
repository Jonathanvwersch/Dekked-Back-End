exports.up = function (knex) {
  return knex.schema
    .table("pages", (table) => {
      table.dateTime("date_created");
      table.dateTime("date_modified");
    })

    .table("users", (table) => {
      table.dateTime("date_created");
      table.dateTime("date_modified");
    });
};

exports.down = function (knex) {
  return knex.schema
    .table("pages", function (table) {
      table.dropColumn("date_created");
      table.dropColumn("date_modified");
    })
    .table("users", function (table) {
      table.dropColumn("date_created");
      table.dropColumn("date_modified");
    });
};
