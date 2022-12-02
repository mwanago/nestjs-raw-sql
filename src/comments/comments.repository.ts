import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import DatabaseService from '../database/database.service';
import CommentModel from './comment.model';
import CommentDto from './comment.dto';
import { isDatabaseError } from '../types/databaseError';
import PostgresErrorCode from '../database/postgresErrorCode.enum';

@Injectable()
class CommentsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM comments
      WHERE deletion_date = NULL
    `);
    return databaseResponse.rows.map(
      (databaseRow) => new CommentModel(databaseRow),
    );
  }

  async getById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM comments
      WHERE id=$1 AND deletion_date = NULL
    `,
      [id],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return new CommentModel(entity);
  }

  async create(commentData: CommentDto, authorId: number) {
    try {
      const databaseResponse = await this.databaseService.runQuery(
        `
      INSERT INTO comments (
        content,
        post_id,
        author_id
      ) VALUES (
        $1,
        $2,
        $3
      ) RETURNING *
    `,
        [commentData.content, commentData.postId, authorId],
      );
      return new CommentModel(databaseResponse.rows[0]);
    } catch (error) {
      if (
        isDatabaseError(error) &&
        error.code === PostgresErrorCode.CheckViolation
      ) {
        throw new BadRequestException(
          'The length of the content needs to be greater than 0',
        );
      }
      throw error;
    }
  }

  async update(id: number, commentDto: CommentDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      UPDATE comments
      SET content = $2, post_id = $3
      WHERE id = $1 AND deletion_date=NULL
      RETURNING *
    `,
      [id, commentDto.content, commentDto.postId],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return new CommentModel(entity);
  }

  async delete(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      UPDATE comments
      SET deletion_date=now()
      WHERE id = $1 AND deletion_date=NULL
      RETURNING *
      `,
      [id],
    );
    if (databaseResponse.rowCount === 0) {
      throw new NotFoundException();
    }
  }

  async restore(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      UPDATE comments
      SET deletion_date=NULL
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );
    if (databaseResponse.rowCount === 0) {
      throw new NotFoundException();
    }
  }
}

export default CommentsRepository;
