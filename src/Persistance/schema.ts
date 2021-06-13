import db from './database';

async function createTables() {
  if (!(await db.schema.hasTable('folders'))) {
    await db.schema.createTable('folders', (table) => {
      table.uuid('id').primary().unique().defaultTo(db.raw('uuid_generate_v4()'));
      table.uuid('owner_id').notNullable();
      table.string('name').notNullable();
      table.dateTime('date_created').notNullable();
      table.dateTime('date_modified').notNullable();
      table.string('color').notNullable();
    });
  }

  if (!(await db.schema.hasTable('pages'))) {
    await db.schema.createTable('pages', (table) => {
      table.uuid('id').primary().unique().defaultTo(db.raw('uuid_generate_v4()'));
      table.string('title').notNullable();
      table.uuid('owner_id').notNullable();
      table.uuid('study_pack_id').notNullable();
      table.specificType('ordering', 'text []').notNullable();
    });
  }

  if (!(await db.schema.hasTable('blocks'))) {
    await db.schema.createTable('blocks', (table) => {
      table.uuid('id').primary().unique().defaultTo(db.raw('uuid_generate_v4()'));
      table.string('draft_key').notNullable();
      table.text('content', 'TEXT').notNullable();
      table.string('owner_id').notNullable();
      table.uuid('parent_id').notNullable();
    });
  }

  if (!(await db.schema.hasTable('users'))) {
    await db.schema.createTable('users', (table) => {
      table.uuid('id').primary().unique().defaultTo(db.raw('uuid_generate_v4()'));
      table.string('email_address').notNullable().unique();
      table.string('password').notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
    });
  }

  if (!(await db.schema.hasTable('binders'))) {
    await db.schema.createTable('binders', (table) => {
      table.uuid('id').primary().unique().defaultTo(db.raw('uuid_generate_v4()'));
      table.uuid('owner_id').notNullable();
      table.uuid('folder_id').notNullable();
      table.string('name').notNullable();
      table.dateTime('date_created').notNullable();
      table.dateTime('date_modified').notNullable();
      table.string('color').notNullable();
    });
  }

  if (!(await db.schema.hasTable('study_packs'))) {
    await db.schema.createTable('study_packs', (table) => {
      table.uuid('id').primary().unique().defaultTo(db.raw('uuid_generate_v4()'));
      table.uuid('owner_id').notNullable();
      table.uuid('binder_id').notNullable();
      table.string('name').notNullable();
      table.dateTime('date_created').notNullable();
      table.dateTime('date_modified').notNullable();
      table.string('color').notNullable();
    });
  }

  if (!(await db.schema.hasTable('flashcards'))) {
    await db.schema.createTable('flashcards', (table) => {
      table.uuid('id').primary().unique().defaultTo(db.raw('uuid_generate_v4()'));
      table.uuid('owner_id').notNullable();
      table.uuid('study_pack_id').notNullable();
      table.specificType('back_ordering', 'text []');
      table.specificType('front_ordering', 'text []');
      table.dateTime('date_created').notNullable();
      table.dateTime('date_modified').notNullable();
      table.string('block_link');
    });
  }
}

createTables();

export default createTables;
