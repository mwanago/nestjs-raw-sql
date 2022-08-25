import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { plainToInstance } from 'class-transformer';
import PostModel from './post.model';
import CreatePostDto from './dto/createPost.dto';

@Injectable()
class PostsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM posts
    `);
    return plainToInstance(PostModel, databaseResponse.rows);
  }

  async create(postData: CreatePostDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      INSERT INTO posts (
        title,
        post_content
      ) VALUES (
        $1,
        $2
      ) RETURNING *
    `,
      [postData.title, postData.content],
    );
    return plainToInstance(PostModel, databaseResponse.rows[0]);
  }

  async count() {
    const databaseService = await this.databaseService.runQuery(`
      SELECT COUNT(*) FROM posts
    `);
    return databaseService.rowCount;
  }
}

export default PostsRepository;
