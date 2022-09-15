import { Injectable } from '@nestjs/common';
import PostsRepository from './posts.repository';
import PostDto from './post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  getPosts(authorId?: number) {
    if (authorId) {
      return this.postsRepository.getByAuthorId(authorId);
    }
    return this.postsRepository.getAll();
  }

  getPostById(id: number) {
    return this.postsRepository.getWithAuthor(id);
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
}
