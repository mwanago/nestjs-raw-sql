import { IsString, IsNotEmpty } from 'class-validator';

class CategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export default CategoryDto;
