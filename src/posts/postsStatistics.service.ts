import { Injectable } from '@nestjs/common';
import PostsStatisticsRepository from './postsStatistics.repository';

@Injectable()
export default class PostsStatisticsService {
  constructor(
    private readonly postsStatisticsRepository: PostsStatisticsRepository,
  ) {}

  getAuthorsWithAnyPosts() {
    return this.postsStatisticsRepository.getAuthorsWithAnyPosts();
  }

  getAuthorsWithoutAnyPosts() {
    return this.postsStatisticsRepository.getAuthorsWithoutAnyPosts();
  }

  getAuthorsWithPostsInCategory(categoryId: number) {
    return this.postsStatisticsRepository.getAuthorsWithPostsInCategory(
      categoryId,
    );
  }
}
