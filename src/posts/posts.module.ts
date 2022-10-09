import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import PostsController from './posts.controller';
import PostsRepository from './posts.repository';
import PostsStatisticsRepository from './postsStatistics.repository';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, PostsStatisticsRepository],
})
export class PostsModule {}
