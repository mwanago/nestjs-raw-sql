import { IsString, IsNotEmpty } from 'class-validator';

class PostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export default PostDto;
