import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import UsersService from '../users/users.service';
import UserAlreadyExistsException from '../users/exceptions/userAlreadyExists.exception';
import { BadRequestException } from '@nestjs/common';
import RegisterDto from './dto/register.dto';

describe('The AuthenticationService', () => {
  let registrationData: RegisterDto;
  let authenticationService: AuthenticationService;
  let createUserMock: jest.Mock;
  beforeEach(async () => {
    registrationData = {
      email: 'john@smith.com',
      name: 'John',
      password: 'strongPassword123',
    };
    createUserMock = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UsersService,
          useValue: {
            create: createUserMock,
          },
        },
      ],
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secretOrPrivateKey: 'Secret key',
        }),
      ],
    }).compile();

    authenticationService = await module.get<AuthenticationService>(
      AuthenticationService,
    );
  });
  describe('when calling the getCookieForLogOut method', () => {
    it('should return a correct string', () => {
      const result = authenticationService.getCookieForLogOut();
      expect(result).toBe('Authentication=; HttpOnly; Path=/; Max-Age=0');
    });
  });
  describe('when registering a new user', () => {
    describe('and when the usersService returns the new user', () => {
      beforeEach(() => {
        createUserMock.mockReturnValue(registrationData);
      });
      it('should return the new user', async () => {
        const result = await authenticationService.register(registrationData);
        expect(result).toBe(registrationData);
      });
    });
    describe('and when the usersService throws the UserAlreadyExistsException', () => {
      beforeEach(() => {
        createUserMock.mockImplementation(() => {
          throw new UserAlreadyExistsException(registrationData.email);
        });
      });
      it('should throw the BadRequestException', () => {
        return expect(() =>
          authenticationService.register(registrationData),
        ).rejects.toThrow(BadRequestException);
      });
    });
  });
});
