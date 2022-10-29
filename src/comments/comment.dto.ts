import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

class CommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  postId: number;
}

export default CommentDto;
