import { Module } from '@nestjs/common';
import CommentsController from './comments.controller';
import CommentsService from './comments.service';
import CommentsRepository from './comments.repository';

@Module({
  imports: [],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
