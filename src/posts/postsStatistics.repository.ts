import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import PostAuthorStatisticsModel from './postAuthorStatistics.model';
import UserModel from '../users/user.model';

@Injectable()
class PostsStatisticsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAuthorsWithAnyPosts() {
    const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM users
      WHERE EXISTS (
        SELECT id FROM posts
        WHERE posts.author_id=users.id
      )
    `);

    return databaseResponse.rows.map(
      (databaseRow) => new UserModel(databaseRow),
    );
  }

  async getAuthorsWithoutAnyPosts() {
    const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM users
      WHERE NOT EXISTS (
        SELECT id FROM posts
        WHERE posts.author_id=users.id
      )
    `);

    return databaseResponse.rows.map(
      (databaseRow) => new UserModel(databaseRow),
    );
  }

  async getAuthorsWithPostsInCategory(categoryId: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT email FROM users
      WHERE EXISTS (
        SELECT * FROM posts
        JOIN categories_posts ON posts.id = categories_posts.post_id
        WHERE posts.author_id = users.id AND categories_posts.category_id = $1
      )
    `,
      [categoryId],
    );

    return databaseResponse.rows.map(
      (databaseRow) => new UserModel(databaseRow),
    );
  }

  async getAuthorsWithPostsLongerThan(postLength: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT email FROM users
      WHERE id = ANY (
        SELECT posts.author_id FROM posts
        WHERE length(posts.post_content) >= $1
      )
    `,
      [postLength],
    );

    return databaseResponse.rows.map(
      (databaseRow) => new UserModel(databaseRow),
    );
  }

  async getPostsAuthorStatistics() {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT
        author_id,
        count(*)::int AS posts_count,
        max(length(post_content)) AS longest_post_length,
        min(length(post_content)) AS shortest_post_length,
        sum(length(post_content))::int AS all_posts_content_sum,
        avg(length(post_content))::real AS average_post_content_length
      FROM posts
      GROUP BY author_id
      ORDER BY posts_count DESC
    `,
      [],
    );
    return databaseResponse.rows.map(
      (databaseRow) => new PostAuthorStatisticsModel(databaseRow),
    );
  }
}

export default PostsStatisticsRepository;
