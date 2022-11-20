import { Injectable } from '@nestjs/common';
import PostsStatisticsRepository from './postsStatistics.repository';

@Injectable()
export default class PostsStatisticsService {
  constructor(
    private readonly postsStatisticsRepository: PostsStatisticsRepository,
  ) {}

  public getAuthorsWithAnyPosts() {
    return this.postsStatisticsRepository.getAuthorsWithAnyPosts();
  }

  public getAuthorsWithoutAnyPosts() {
    return this.postsStatisticsRepository.getAuthorsWithoutAnyPosts();
  }
}
