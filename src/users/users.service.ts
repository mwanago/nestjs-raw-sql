import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import UsersRepository from './users.repository';
import UserAlreadyExistsException from './exceptions/userAlreadyExists.exception';

@Injectable()
class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  async getByEmail(email: string) {
    return this.usersRepository.getByEmail(email);
  }

  async getById(id: number) {
    return this.usersRepository.getById(id);
  }

  async create(user: CreateUserDto) {
    try {
      return await this.usersRepository.create(user);
    } catch (error) {
      if (error instanceof UserAlreadyExistsException) {
        this.logger.warn(error.message);
      }
      throw error;
    }
  }
}

export default UsersService;
