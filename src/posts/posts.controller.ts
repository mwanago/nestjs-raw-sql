import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import FindOneParams from '../utils/findOneParams';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(id);
  }

  @Post()
  createPost(@Body() postData: CreatePostDto) {
    return this.postsService.createPost(postData);
  }

  @Delete(':id')
  deletePost(@Param() { id }: FindOneParams) {
    return this.postsService.deletePost(id);
  }
}
