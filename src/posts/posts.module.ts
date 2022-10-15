import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import PostsController from './posts.controller';
import PostsRepository from './posts.repository';
import PostsStatisticsRepository from './postsStatistics.repository';
import PostsSearchRepository from './postsSearch.repository';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsRepository,
    PostsStatisticsRepository,
    PostsSearchRepository,
  ],
})
export class PostsModule {}
