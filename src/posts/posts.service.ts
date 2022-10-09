import { Injectable } from '@nestjs/common';
import PostsRepository from './posts.repository';
import PostDto from './post.dto';
import PostsStatisticsRepository from './postsStatistics.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly postsStatisticsRepository: PostsStatisticsRepository,
  ) {}

  getPosts(
    authorId?: number,
    offset?: number,
    limit?: number,
    idsToSkip?: number,
  ) {
    if (authorId) {
      return this.postsRepository.getByAuthorId(
        authorId,
        offset,
        limit,
        idsToSkip,
      );
    }
    return this.postsRepository.get(offset, limit, idsToSkip);
  }

  getPostById(id: number) {
    return this.postsRepository.getWithDetails(id);
  }

  createPost(postData: PostDto, authorId: number) {
    if (postData.categoryIds?.length) {
      return this.postsRepository.createWithCategories(postData, authorId);
    }
    return this.postsRepository.create(postData, authorId);
  }

  updatePost(id: number, postData: PostDto) {
    return this.postsRepository.update(id, postData);
  }

  deletePost(id: number) {
    return this.postsRepository.delete(id);
  }

  getPostAuthorStatistics() {
    return this.postsStatisticsRepository.getPostsAuthorStatistics();
  }
}
