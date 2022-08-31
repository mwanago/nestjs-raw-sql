import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LogInDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export default LogInDto;
