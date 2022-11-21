import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

class PostLengthParam {
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  postLength: number;
}

export default PostLengthParam;
