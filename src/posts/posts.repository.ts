import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import DatabaseService from '../database/database.service';
import PostModel from './post.model';
import PostDto from './post.dto';
import PostWithCategoryIdsModel from './postWithCategoryIds.model';
import PostWithDetails from './postWithDetails.model';
import { PoolClient } from 'pg';
import PostgresErrorCode from '../database/postgresErrorCode.enum';
import isRecord from '../utils/isRecord';
import getDifferenceBetweenArrays from '../utils/getDifferenceBetweenArrays';

@Injectable()
class PostsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async get(offset = 0, limit: number | null = null, idsToSkip = 0) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      WITH selected_posts AS (
        SELECT * FROM posts
        WHERE id > $3
        ORDER BY id ASC
        OFFSET $1
        LIMIT $2
      ),
      total_posts_count_response AS (
        SELECT COUNT(*)::int AS total_posts_count FROM posts
      )
      SELECT * FROM selected_posts, total_posts_count_response
    `,
      [offset, limit, idsToSkip],
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

  async getByAuthorId(
    authorId: number,
    offset = 0,
    limit: number | null = null,
    idsToSkip = 0,
  ) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      WITH selected_posts AS (
        SELECT * FROM posts
        WHERE author_id=$1 AND id > $4
        ORDER BY id ASC
        OFFSET $2
        LIMIT $3
      ),
      total_posts_count_response AS (
        SELECT COUNT(*)::int AS total_posts_count FROM posts
        WHERE author_id=$1 AND id > $4
      )
      SELECT * FROM selected_posts, total_posts_count_response
    `,
      [authorId, offset, limit, idsToSkip],
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
    return new PostModel(entity);
  }

  async getWithDetails(postId: number) {
    const postResponse = await this.databaseService.runQuery(
      `
      SELECT
        posts.id AS id, posts.title AS title, posts.post_content AS post_content, posts.author_id as author_id,
        users.id AS user_id, users.email AS user_email, users.name AS user_name, users.password AS user_password,
        addresses.id AS address_id, addresses.street AS address_street, addresses.city AS address_city, addresses.country AS address_country
      FROM posts
      JOIN users ON posts.author_id = users.id
      LEFT JOIN addresses ON users.address_id = addresses.id
      WHERE posts.id=$1
      `,
      [postId],
    );
    const postEntity = postResponse.rows[0];
    if (!postEntity) {
      throw new NotFoundException();
    }

    const categoryIdsResponse = await this.databaseService.runQuery(
      `
      SELECT ARRAY(
        SELECT category_id FROM categories_posts
        WHERE post_id = $1
      ) AS category_ids
    `,
      [postId],
    );

    return new PostWithDetails({
      ...postEntity,
      category_ids: categoryIdsResponse.rows[0].category_ids,
    });
  }

  async create(postData: PostDto, authorId: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      INSERT INTO posts (
        title,
        post_content,
        author_id
      ) VALUES (
        $1,
        $2,
        $3
      ) RETURNING *
    `,
      [postData.title, postData.content, authorId],
    );
    return new PostModel(databaseResponse.rows[0]);
  }

  async createWithCategories(postData: PostDto, authorId: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      WITH created_post AS (
        INSERT INTO posts (
          title,
          post_content,
          author_id
        ) VALUES (
          $1,
          $2,
          $3
        ) RETURNING *
      ),
      created_relationships AS (
        INSERT INTO categories_posts (
          post_id, category_id
        )
          SELECT created_post.id AS post_id, unnest($4::int[]) AS category_id
          FROM created_post 
      )
      SELECT *, $4 as category_ids FROM created_post
    `,
      [postData.title, postData.content, authorId, postData.categoryIds],
    );
    return new PostWithCategoryIdsModel(databaseResponse.rows[0]);
  }

  private async removeCategoriesFromPost(
    client: PoolClient,
    postId: number,
    categoryIdsToRemove: number[],
  ) {
    if (!categoryIdsToRemove.length) {
      return;
    }
    return client.query(
      `
      DELETE FROM categories_posts WHERE post_id = $1 AND category_id = ANY($2::int[])
    `,
      [postId, categoryIdsToRemove],
    );
  }

  private async addCategoriesToPost(
    client: PoolClient,
    postId: number,
    categoryIdsToAdd: number[],
  ) {
    if (!categoryIdsToAdd.length) {
      return;
    }
    try {
      await client.query(
        `
      INSERT INTO categories_posts (
        post_id, category_id
      )
        SELECT $1 AS post_id, unnest($2::int[]) AS category_id
    `,
        [postId, categoryIdsToAdd],
      );
    } catch (error) {
      if (
        isRecord(error) &&
        error.code === PostgresErrorCode.ForeignKeyViolation
      ) {
        throw new BadRequestException('Category not found');
      }
      throw error;
    }
  }

  private async getCategoryIdsRelatedToPost(
    client: PoolClient,
    postId: number,
  ): Promise<number[]> {
    const categoryIdsResponse = await client.query(
      `
      SELECT ARRAY(
        SELECT category_id FROM categories_posts
        WHERE post_id = $1
      ) AS category_ids
    `,
      [postId],
    );
    return categoryIdsResponse.rows[0].category_ids;
  }

  private async updateCategories(
    client: PoolClient,
    postId: number,
    newCategoryIds: number[],
  ) {
    const existingCategoryIds = await this.getCategoryIdsRelatedToPost(
      client,
      postId,
    );

    const categoryIdsToRemove = getDifferenceBetweenArrays(
      existingCategoryIds,
      newCategoryIds,
    );

    const categoryIdsToAdd = getDifferenceBetweenArrays(
      newCategoryIds,
      existingCategoryIds,
    );

    await this.removeCategoriesFromPost(client, postId, categoryIdsToRemove);
    await this.addCategoriesToPost(client, postId, categoryIdsToAdd);

    return this.getCategoryIdsRelatedToPost(client, postId);
  }

  async update(id: number, postData: PostDto) {
    const client = await this.databaseService.getPoolClient();

    try {
      await client.query('BEGIN;');

      const databaseResponse = await client.query(
        `
        UPDATE posts
        SET title = $2, post_content = $3
        WHERE id = $1
        RETURNING *
    `,
        [id, postData.title, postData.content],
      );
      const entity = databaseResponse.rows[0];
      if (!entity) {
        throw new NotFoundException();
      }

      const newCategoryIds = postData.categoryIds || [];

      const categoryIds = await this.updateCategories(
        client,
        id,
        newCategoryIds,
      );

      return new PostWithCategoryIdsModel({
        ...entity,
        category_ids: categoryIds,
      });
    } catch (error) {
      await client.query('ROLLBACK;');
      throw error;
    } finally {
      client.release();
    }
  }

  async delete(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `DELETE FROM posts WHERE id=$1`,
      [id],
    );
    if (databaseResponse.rowCount === 0) {
      throw new NotFoundException();
    }
  }
}

export default PostsRepository;
