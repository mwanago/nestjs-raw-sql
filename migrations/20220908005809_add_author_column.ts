import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const adminEmail = 'admin@admin.com';

  const defaultUserResponse = await knex.raw(
    `
    SELECT id FROM users
      WHERE email=?
  `,
    [adminEmail],
  );

  const adminId = defaultUserResponse.rows[0]?.id;

  if (!adminId) {
    throw new Error('The default user does not exist');
  }

  await knex.raw(
    `
    ALTER TABLE posts
      ADD COLUMN author_id int REFERENCES users(id)
  `,
  );

  await knex.raw(
    `
    UPDATE posts SET author_id = ?
  `,
    [adminId],
  );

  await knex.raw(
    `
    ALTER TABLE posts
      ALTER COLUMN author_id SET NOT NULL
  `,
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    ALTER TABLE posts
      DROP COLUMN author_id;
  `);
}
