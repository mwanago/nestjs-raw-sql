import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import PostModel from './post.model';

@Injectable()
class PostsSearchRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async search(
    offset = 0,
    limit: number | null = null,
    idsToSkip = 0,
    searchQuery: string,
  ) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      WITH selected_posts AS (
        SELECT * FROM posts
        WHERE id > $3 AND (title ILIKE concat('%', $4::text, '%') OR post_content ILIKE concat('%', $4::text, '%'))
        ORDER BY id ASC
        OFFSET $1
        LIMIT $2
      ),
      total_posts_count_response AS (
        SELECT COUNT(*)::int AS total_posts_count FROM posts
        WHERE title ILIKE concat('%', $4::text, '%') OR post_content ILIKE concat('%', $4::text, '%')
      )
      SELECT * FROM selected_posts, total_posts_count_response
    `,
      [offset, limit, idsToSkip, searchQuery],
    );
    const items = databaseResponse.rows.map(
      (databaseRow) => new PostModel(databaseRow),
    );
    const count = databaseResponse.rows[0]?.total_posts_count || 0;
    return {
      items,
      count,
    };
  }

  async searchByAuthor(
    authorId: number,
    offset = 0,
    limit: number | null = null,
    idsToSkip = 0,
    searchQuery: string,
  ) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      WITH selected_posts AS (
        SELECT * FROM posts
        WHERE author_id=$1 AND id > $4 AND (title ILIKE concat('%', $5::text, '%') OR post_content ILIKE concat('%', $5::text, '%'))
        ORDER BY id ASC
        OFFSET $2
        LIMIT $3
      ),
      total_posts_count_response AS (
        SELECT COUNT(*)::int AS total_posts_count FROM posts
        WHERE author_id=$1 AND id > $4 AND (title ILIKE concat('%', $5::text, '%') OR post_content ILIKE concat('%', $5::text, '%'))
      )
      SELECT * FROM selected_posts, total_posts_count_response
    `,
      [authorId, offset, limit, idsToSkip, searchQuery],
    );
    const items = databaseResponse.rows.map(
      (databaseRow) => new PostModel(databaseRow),
    );
    const count = databaseResponse.rows[0]?.total_posts_count || 0;
    return {
      items,
      count,
    };
  }
}

export default PostsSearchRepository;
