import { IsString, IsNotEmpty } from 'class-validator';

class SearchPostsQuery {
  @IsString()
  @IsNotEmpty()
  search?: string;
}

export default SearchPostsQuery;
