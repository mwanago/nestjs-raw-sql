import { Injectable } from '@nestjs/common';
import PostsRepository from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  getPosts() {
    return this.postsRepository.getAll();
  }

  async countPosts() {
    return this.postsRepository.count();
  }
}
