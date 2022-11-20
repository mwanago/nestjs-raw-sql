import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from "@nestjs/common";
import PostsStatisticsService from './postsStatistics.service';

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
}
