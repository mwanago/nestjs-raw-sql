export interface CommentModelData {
  id: number;
  content: string;
  author_id: number;
  post_id: number;
  deletion_date: Date | null;
}
class CommentModel {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  deletionDate: Date | null;
  constructor(commentData: CommentModelData) {
    this.id = commentData.id;
    this.content = commentData.content;
    this.authorId = commentData.author_id;
    this.postId = commentData.post_id;
    this.deletionDate = commentData.deletion_date;
  }
}

export default CommentModel;
