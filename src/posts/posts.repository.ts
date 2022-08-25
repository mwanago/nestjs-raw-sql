import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';

@Injectable()
class PostsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM posts
    `);
    return databaseResponse.rows;
  }

  async count() {
    const databaseService = await this.databaseService.runQuery(`
      SELECT COUNT(*) FROM posts
    `);
    return databaseService.rowCount;
  }
}

export default PostsRepository;
