export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
}
