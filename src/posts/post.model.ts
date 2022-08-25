import { Expose } from 'class-transformer';

class PostModel {
  id: number;
  title: string;
  @Expose({ name: 'post_content' })
  content: string;
}

export default PostModel;
