import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import UsersRepository from './users.repository';

@Injectable()
class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getByEmail(email: string) {
    return this.usersRepository.getByEmail(email);
  }

  async getById(id: number) {
    return this.usersRepository.getById(id);
  }

  async create(user: CreateUserDto) {
    return this.usersRepository.create(user);
  }
}

export default UsersService;
