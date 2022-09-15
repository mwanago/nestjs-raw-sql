import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import CategoryModel from './category.model';
import CategoryDto from './category.dto';

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
