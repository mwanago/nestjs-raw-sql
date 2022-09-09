import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

class GetPostsByAuthorQuery {
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => Number(value))
  authorId?: number;
}

export default GetPostsByAuthorQuery;
