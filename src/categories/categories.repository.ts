import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import CategoryModel from './category.model';
import CategoryDto from './category.dto';
import CategoryWithPostsModel from './categoryWithPosts.model';

@Injectable()
class CategoriesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM categories
    `);
    return databaseResponse.rows.map(
      (databaseRow) => new CategoryModel(databaseRow),
    );
  }

  async getById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM categories WHERE id=$1
    `,
      [id],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return new CategoryModel(entity);
  }

  async getCategoryWithPosts(categoryId: number) {
    const categoriesDatabaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM categories WHERE id=$1
    `,
      [categoryId],
    );
    if (!categoriesDatabaseResponse.rows[0]) {
      throw new NotFoundException();
    }

    const postsDatabaseResponse = await this.databaseService.runQuery(
      `
      SELECT posts.id AS id, posts.title AS title, posts.post_content AS post_content, posts.author_id AS author_id
      FROM categories_posts
      JOIN posts ON posts.id=categories_posts.post_id
      WHERE category_id = $1
    `,
      [categoryId],
    );

    return new CategoryWithPostsModel({
      ...categoriesDatabaseResponse.rows[0],
      posts: postsDatabaseResponse.rows,
    });
  }

  async create(categoryData: CategoryDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      INSERT INTO categories (
        name
      ) VALUES (
        $1
      ) RETURNING *
    `,
      [categoryData.name],
    );
    return new CategoryModel(databaseResponse.rows[0]);
  }

  async update(id: number, categoryData: CategoryDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      UPDATE categories
      SET name = $2
      WHERE id = $1
      RETURNING *
    `,
      [id, categoryData.name],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return new CategoryModel(entity);
  }

  async delete(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `DELETE FROM categories WHERE id=$1`,
      [id],
    );
    if (databaseResponse.rowCount === 0) {
      throw new NotFoundException();
    }
  }
}

export default CategoriesRepository;
