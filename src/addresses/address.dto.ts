import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

class AddressDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  street?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  city?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  country?: string;
}

export default AddressDto;
