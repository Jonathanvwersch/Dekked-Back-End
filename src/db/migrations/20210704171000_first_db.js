exports.up = function (knex) {
  return knex.schema
    .table("binders", (table) => {
      table.dateTime("date_created");
      table.dateTime("date_modified");
    })

    .table("study_sets", (table) => {
      table.dateTime("date_created");
      table.dateTime("date_modified");
    });
};

exports.down = function (knex) {
  return knex.schema
    .table("binders", function (table) {
      table.dropColumn("date_created");
      table.dropColumn("date_modified");
    })
    .table("study_sets", function (table) {
      table.dropColumn("date_created");
      table.dropColumn("date_modified");
    });
};
