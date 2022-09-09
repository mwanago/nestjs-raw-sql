export interface PostModelData {
  id: number;
  title: string;
  post_content: string;
  author_id: number;
}
class PostModel {
  id: number;
  title: string;
  content: string;
  authorId: number;
  constructor(postData: PostModelData) {
    this.id = postData.id;
    this.title = postData.title;
    this.content = postData.post_content;
    this.authorId = postData.author_id;
  }
}

export default PostModel;
