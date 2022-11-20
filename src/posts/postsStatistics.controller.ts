import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import PostsStatisticsService from './postsStatistics.service';
import IdParams from './idParams';

@Controller('posts-statistics')
@UseInterceptors(ClassSerializerInterceptor)
export default class PostsStatisticsController {
  constructor(
    private readonly postsStatisticsRepository: PostsStatisticsService,
  ) {}

  @Get('users-with-any-posts')
  getAuthorsWithAnyPosts() {
    return this.postsStatisticsRepository.getAuthorsWithAnyPosts();
  }

  @Get('users-without-any-posts')
  getAuthorsWithoutAnyPosts() {
    return this.postsStatisticsRepository.getAuthorsWithoutAnyPosts();
  }

  @Get('users-with-posts-in-category/:id')
  getAuthorsWithoutPostsInCategory(@Param() { id: categoryId }: IdParams) {
    return this.postsStatisticsRepository.getAuthorsWithPostsInCategory(
      categoryId,
    );
  }
}
