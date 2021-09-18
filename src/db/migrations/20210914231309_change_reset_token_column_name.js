exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.renameColumn("resetPasswordToken", "reset_password_token");
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", function (table) {
    table.renameColumn("reset_password_token", "resetPasswordToken");
  });
};
