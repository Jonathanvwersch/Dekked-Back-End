exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("resetPasswordToken", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", function (table) {
    table.dropColumn("resetPasswordToken", 255);
  });
};
