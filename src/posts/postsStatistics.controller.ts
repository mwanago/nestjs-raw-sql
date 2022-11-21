import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import PostsStatisticsService from './postsStatistics.service';
import IdParams from './idParams';
import PostLengthParam from './postLengthParam';

@Controller('posts-statistics')
@UseInterceptors(ClassSerializerInterceptor)
export default class PostsStatisticsController {
  constructor(
    private readonly postsStatisticsService: PostsStatisticsService,
  ) {}

  @Get('users-with-any-posts')
  getAuthorsWithAnyPosts() {
    return this.postsStatisticsService.getAuthorsWithAnyPosts();
  }

  @Get('users-without-any-posts')
  getAuthorsWithoutAnyPosts() {
    return this.postsStatisticsService.getAuthorsWithoutAnyPosts();
  }

  @Get('users-with-posts-in-category/:id')
  getAuthorsWithoutPostsInCategory(@Param() { id: categoryId }: IdParams) {
    return this.postsStatisticsService.getAuthorsWithPostsInCategory(
      categoryId,
    );
  }

  @Get('users-with-posts-longer-than')
  getAuthorsWithPostsLongerThan(@Query() { postLength }: PostLengthParam) {
    return this.postsStatisticsService.getAuthorsWithPostsLongerThan(
      postLength,
    );
  }

  @Get('users-with-posts-shorter-than-average')
  getUsersWithPostsShorterThanAverage(
    @Query() { postLength }: PostLengthParam,
  ) {
    return this.postsStatisticsService.getAuthorsWithPostsLongerThan(
      postLength,
    );
  }
}
