import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import FindOneParams from '../utils/findOneParams';
import PostDto from './post.dto';
import GetPostsByAuthorQuery from './getPostsByAuthorQuery';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import PaginationParams from '../utils/paginationParams';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(
    @Query() { authorId }: GetPostsByAuthorQuery,
    @Query() { offset, limit, idsToSkip }: PaginationParams,
  ) {
    return this.postsService.getPosts(authorId, offset, limit, idsToSkip);
  }

  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(id);
  }

  @Put(':id')
  updatePost(@Param() { id }: FindOneParams, @Body() postData: PostDto) {
    return this.postsService.updatePost(id, postData);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  createPost(@Body() postData: PostDto, @Req() request: RequestWithUser) {
    return this.postsService.createPost(postData, request.user.id);
  }

  @Delete(':id')
  deletePost(@Param() { id }: FindOneParams) {
    return this.postsService.deletePost(id);
  }
}
