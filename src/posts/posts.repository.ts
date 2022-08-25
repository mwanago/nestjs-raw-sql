import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM posts WHERE id=$1
    `,
      [id],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return plainToInstance(PostModel, entity);
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

  async delete(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `DELETE FROM posts WHERE id=$1`,
      [id],
    );
    if (databaseResponse.rowCount === 0) {
      throw new NotFoundException();
    }
    return;
  }

  async count() {
    const databaseService = await this.databaseService.runQuery(`
      SELECT COUNT(*) FROM posts
    `);
    return databaseService.rowCount;
  }
}

export default PostsRepository;
