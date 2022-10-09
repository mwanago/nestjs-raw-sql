import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import PostAuthorStatisticsModel from './postAuthorStatistics.model';

@Injectable()
class PostsStatisticsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getPostsAuthorStatistics() {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT
        author_id,
        count(*)::int AS posts_count,
        max(length(post_content)) AS longest_post_length,
        min(length(post_content)) AS shortest_post_length,
        sum(length(post_content))::int AS all_posts_content_sum
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
