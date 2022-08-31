import { BadRequestException } from '@nestjs/common';

class UserAlreadyExistsException extends BadRequestException {
  constructor(email: string) {
    super(`User with ${email} email already exists`);
  }
}

export default UserAlreadyExistsException;
