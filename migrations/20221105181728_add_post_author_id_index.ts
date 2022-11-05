import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE INDEX post_author_id_index ON posts (author_id)
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    DROP INDEX post_author_id_index
  `);
}
