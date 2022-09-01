import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsOptional()
  street: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  country: string;
}

export default AddressDto;
