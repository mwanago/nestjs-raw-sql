import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import PostsController from './posts.controller';
import PostsRepository from './posts.repository';
import PostsStatisticsRepository from './postsStatistics.repository';
import PostsSearchRepository from './postsSearch.repository';
import PostsStatisticsController from './postsStatistics.controller';
import PostsStatisticsService from './postsStatistics.service';

@Module({
  imports: [],
  controllers: [PostsController, PostsStatisticsController],
  providers: [
    PostsService,
    PostsRepository,
    PostsStatisticsRepository,
    PostsSearchRepository,
    PostsStatisticsService,
  ],
})
export class PostsModule {}
