import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    ALTER TABLE comments
    ADD CONSTRAINT comment_length_constraint CHECK (
      length(content) > 0
    )
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    ALTER TABLE comments DROP CONSTRAINT comment_length_constraint;
  `);
}
