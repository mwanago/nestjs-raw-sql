import { Injectable } from '@nestjs/common';
import PostsRepository from './posts.repository';
import PostDto from './post.dto';
import PostsStatisticsRepository from './postsStatistics.repository';
import PostsSearchRepository from './postsSearch.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly postsStatisticsRepository: PostsStatisticsRepository,
    private readonly postsSearchRepository: PostsSearchRepository,
  ) {}

  getPosts(
    authorId?: number,
    offset?: number,
    limit?: number,
    idsToSkip?: number,
    searchQuery?: string,
  ) {
    if (authorId && searchQuery) {
      return this.postsSearchRepository.searchByAuthor(
        authorId,
        offset,
        limit,
        idsToSkip,
        searchQuery,
      );
    }
    if (authorId) {
      return this.postsRepository.getByAuthorId(
        authorId,
        offset,
        limit,
        idsToSkip,
      );
    }
    if (searchQuery) {
      return this.postsSearchRepository.search(
        offset,
        limit,
        idsToSkip,
        searchQuery,
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
