import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import PostAuthorStatisticsModel from './postAuthorStatistics.model';

@Injectable()
class PostsStatisticsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getPostsAuthorStatistics() {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT author_id, COUNT(*) AS posts_count FROM posts
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
