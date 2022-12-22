import { Test } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import DatabaseService from '../database/database.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import UsersService from '../users/users.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import UsersRepository from '../users/users.repository';
import RegisterDto from './dto/register.dto';
import { UserModelData } from '../users/user.model';

describe('The AuthenticationController', () => {
  let runQueryMock: jest.Mock;
  let app: INestApplication;
  beforeEach(async () => {
    runQueryMock = jest.fn();
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secretOrPrivateKey: 'Secret key',
        }),
      ],
      controllers: [AuthenticationController],
      providers: [
        AuthenticationService,
        UsersRepository,
        UsersService,
        {
          provide: DatabaseService,
          useValue: {
            runQuery: runQueryMock,
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  describe('when making the /register POST request', () => {
    describe('and using an incorrect email', () => {
      it('should throw an error', () => {
        return request(app.getHttpServer())
          .post('/authentication/register')
          .send({
            email: 'not-an-email',
            name: 'John',
            password: 'strongPassword',
          })
          .expect(400);
      });
    });
    describe('and using the correct data', () => {
      let registrationData: RegisterDto;
      let userModelData: UserModelData;
      beforeEach(() => {
        registrationData = {
          email: 'john@smith.com',
          name: 'John',
          password: 'strongPassword',
        };

        userModelData = {
          id: 1,
          email: registrationData.email,
          name: registrationData.name,
          password: registrationData.password,
          address_id: null,
          address_country: null,
          address_city: null,
          address_street: null,
        };

        runQueryMock.mockResolvedValue({
          rows: [userModelData],
        });
      });
      it('should result with the 201 status', () => {
        return request(app.getHttpServer())
          .post('/authentication/register')
          .send(registrationData)
          .expect(201);
      });
      it('should respond with the data without the password', () => {
        return request(app.getHttpServer())
          .post('/authentication/register')
          .send(registrationData)
          .expect({
            id: userModelData.id,
            name: userModelData.name,
            email: userModelData.email,
          });
      });
    });
  });
});
