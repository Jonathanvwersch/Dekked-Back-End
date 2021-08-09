exports.up = async function (knex) {
  if (!(await knex.schema.hasTable("folders"))) {
    await knex.schema.createTable("folders", (table) => {
      table
        .uuid("id")
        .primary()
        .unique()
        .defaultTo(knex.raw("gen_random_uuid()"));
      table.uuid("owner_id").notNullable();
      table.string("name").notNullable();
      table.dateTime("date_created");
      table.dateTime("date_modified");
      table.string("color").notNullable();
    });
  }

  if (!(await knex.schema.hasTable("binders"))) {
    await knex.schema.createTable("binders", (table) => {
      table
        .uuid("id")
        .primary()
        .unique()
        .defaultTo(knex.raw("gen_random_uuid()"));
      table.uuid("owner_id").notNullable();
      table.uuid("folder_id").notNullable();
      table.string("name").notNullable();
      table.dateTime("date_created");
      table.dateTime("date_modified");
      table.string("color").notNullable();
    });
  }

  if (!(await knex.schema.hasTable("study_sets"))) {
    await knex.schema.createTable("study_sets", (table) => {
      table
        .uuid("id")
        .primary()
        .unique()
        .defaultTo(knex.raw("gen_random_uuid()"));
      table.uuid("owner_id").notNullable();
      table.uuid("binder_id").notNullable();
      table.string("name").notNullable();
      table.dateTime("date_created");
      table.dateTime("date_modified");
      table.string("color").notNullable();
    });
  }

  if (!(await knex.schema.hasTable("study_sets"))) {
    await knex.schema.createTable("study_sets", (table) => {
      table
        .uuid("id")
        .primary()
        .unique()
        .defaultTo(knex.raw("gen_random_uuid()"));
      table.uuid("owner_id").notNullable();
      table.uuid("binder_id").notNullable();
      table.string("name").notNullable();
      table.dateTime("date_created");
      table.dateTime("date_modified");
      table.string("color").notNullable();
    });
  }

  if (!(await knex.schema.hasTable("pages"))) {
    await knex.schema.createTable("pages", (table) => {
      table
        .uuid("id")
        .primary()
        .unique()
        .defaultTo(knex.raw("gen_random_uuid()"));
      table.uuid("owner_id").notNullable();
      table.uuid("study_set_id").notNullable();
      table.specificType("ordering", "text []").notNullable();
      table.dateTime("date_created");
      table.dateTime("date_modified");
    });
  }

  if (!(await knex.schema.hasTable("decks"))) {
    await knex.schema.createTable("decks", (table) => {
      table
        .uuid("id")
        .primary()
        .unique()
        .defaultTo(knex.raw("gen_random_uuid()"));
      table.uuid("owner_id").notNullable();
      table.dateTime("date_created");
      table.dateTime("date_modified");
      table.uuid("study_set_id").notNullable();
      table.integer("easy_bonus").defaultTo(130);
      table.integer("interval_modifier").defaultTo(100);
      table.integer("new_interval").defaultTo(0);
      table.string("name");
    });
  }

  if (!(await knex.schema.hasTable("flashcards"))) {
    await knex.schema.createTable("flashcards", (table) => {
      table
        .uuid("id")
        .primary()
        .unique()
        .defaultTo(knex.raw("gen_random_uuid()"));
      table.uuid("owner_id").notNullable();
      table.uuid("study_set_id").notNullable();
      table.specificType("back_ordering", "text []");
      table.specificType("front_ordering", "text []");
      table.dateTime("date_created");
      table.dateTime("date_modified");
      table.string("block_link");
      table.uuid("deck_id");
      table.string("status").defaultTo("New");
      table.integer("ease_factor").defaultTo(250);
      table.integer("failed_consecutive_attempts").defaultTo(0);
      table.integer("interval");
      table.dateTime("due_date");
      table.string("learning_status").defaultTo("New");
    });
  }

  if (!(await knex.schema.hasTable("blocks"))) {
    await knex.schema.createTable("blocks", (table) => {
      table
        .uuid("id")
        .primary()
        .unique()
        .defaultTo(knex.raw("gen_random_uuid()"));
      table.string("draft_key").notNullable();
      table.text("content", "TEXT").notNullable();
      table.string("owner_id").notNullable();
      table.uuid("parent_id").notNullable();
      table.dateTime("date_created");
      table.dateTime("date_modified");
    });
  }

  if (!(await knex.schema.hasTable("users"))) {
    await knex.schema.createTable("users", (table) => {
      table
        .uuid("id")
        .primary()
        .unique()
        .defaultTo(knex.raw("gen_random_uuid()"));
      table.string("email_address").notNullable().unique();
      table.string("password");
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.dateTime("date_created");
      table.dateTime("date_modified");
    });
  }
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("users")
    .dropTable("flashcards")
    .dropTable("folders")
    .dropTable("binders")
    .dropTable("study_sets")
    .dropTable("blocks")
    .dropTable("decks")
    .dropTable("pages");
};
