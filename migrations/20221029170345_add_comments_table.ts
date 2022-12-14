import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE comments (
      id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      content text NOT NULL,
      post_id int REFERENCES posts(id) NOT NULL,
      author_id int REFERENCES posts(id) NOT NULL,
      deletion_date timestamptz
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    DROP TABLE comments;
  `);
}
