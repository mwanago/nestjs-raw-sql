import { Injectable } from '@nestjs/common';
import CommentsRepository from './comments.repository';
import CommentDto from './comment.dto';

@Injectable()
class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  getAll() {
    return this.commentsRepository.getAll();
  }

  getBytId(id: number) {
    return this.commentsRepository.getById(id);
  }

  create(commentData: CommentDto, authorId: number) {
    return this.commentsRepository.create(commentData, authorId);
  }

  update(id: number, commentData: CommentDto) {
    return this.commentsRepository.update(id, commentData);
  }

  delete(id: number) {
    return this.commentsRepository.delete(id);
  }
}

export default CommentsService;
