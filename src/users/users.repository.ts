import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { plainToInstance } from 'class-transformer';
import UserModel from './user.model';
import { CreateUserDto } from './dto/createUser.dto';
import isRecord from '../utils/isRecord';
import PostgresErrorCode from '../database/postgresErrorCode.enum';
import UserAlreadyExistsException from './exceptions/userAlreadyExists.exception';

@Injectable()
class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getByEmail(email: string) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM users WHERE email=$1
    `,
      [email],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return plainToInstance(UserModel, entity);
  }

  async getById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM users WHERE id=$1
    `,
      [id],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return plainToInstance(UserModel, entity);
  }

  async create(userData: CreateUserDto) {
    try {
      const databaseResponse = await this.databaseService.runQuery(
        `
      INSERT INTO users (
        email,
        name,
        password
      ) VALUES (
        $1,
        $2,
        $3
      ) RETURNING *
    `,
        [userData.email, userData.name, userData.password],
      );
      return plainToInstance(UserModel, databaseResponse.rows[0]);
    } catch (error) {
      if (isRecord(error) && error.code === PostgresErrorCode.UniqueViolation) {
        throw new UserAlreadyExistsException(userData.email);
      }
      throw error;
    }
  }
}

export default UsersRepository;
