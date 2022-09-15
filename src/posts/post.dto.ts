import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

class PostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  categoryIds?: number[];
}

export default PostDto;
