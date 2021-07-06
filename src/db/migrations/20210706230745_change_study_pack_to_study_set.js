exports.up = function (knex) {
  return knex.schema.renameTable("study_packs", "study_sets");
};

exports.down = function (knex) {
  return knex.schema.renameTable("study_sets", "study_packs");
};
