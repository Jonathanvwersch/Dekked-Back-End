exports.up = function (knex) {
  return knex.schema.table("pages", (table) => {
    table.renameColumn("study_pack_id", "study_set_id");
  });
};

exports.down = function (knex) {
  return knex.schema.table("pages", (table) => {
    table.renameColumn("study_set_id", "study_pack_id");
  });
};
