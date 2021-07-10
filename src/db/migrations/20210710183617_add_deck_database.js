exports.up = function (knex) {
  return knex.schema.createTable("decks", (table) => {
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("owner_id").notNullable();
    table.dateTime("date_created").notNullable();
    table.dateTime("date_modified").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("decks");
};
