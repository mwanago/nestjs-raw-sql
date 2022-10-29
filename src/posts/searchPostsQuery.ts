import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

class SearchPostsQuery {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  search?: string;
}

export default SearchPostsQuery;
