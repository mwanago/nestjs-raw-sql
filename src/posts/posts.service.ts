import { Injectable } from '@nestjs/common';
import PostsRepository from './posts.repository';
import CreatePostDto from './dto/createPost.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  getPosts() {
    return this.postsRepository.getAll();
  }

  createPost(postData: CreatePostDto) {
    return this.postsRepository.create(postData);
  }
}
