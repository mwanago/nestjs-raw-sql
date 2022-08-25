import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) {}

  getPosts() {
    return this.databaseService.runQuery(`
      SELECT * FROM posts
    `);
  }
}
