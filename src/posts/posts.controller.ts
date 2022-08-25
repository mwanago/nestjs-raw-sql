import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import CreatePostDto from './dto/createPost.dto';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts() {
    return this.postsService.getPosts();
  }

  @Post()
  async createPost(@Body() postData: CreatePostDto) {
    return this.postsService.createPost(postData);
  }
}
