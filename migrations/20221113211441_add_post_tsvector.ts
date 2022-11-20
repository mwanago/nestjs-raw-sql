import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE posts
    ADD COLUMN text_tsvector tsvector GENERATED ALWAYS AS (
      setweight(to_tsvector('english', title), 'A') ||
      setweight(to_tsvector('english', post_content), 'B')
    ) STORED
  `);

  return knex.raw(`
    CREATE INDEX post_text_tsvector_index ON posts USING GIN  (text_tsvector)
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    ALTER TABLE posts
    DROP COLUMN text_tsvector
  `);
}
