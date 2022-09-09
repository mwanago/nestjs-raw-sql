import PostModel, { PostModelData } from './post.model';
import UserModel from '../users/user.model';

interface PostWithAuthorModelData extends PostModelData {
  user_id: number;
  user_email: string;
  user_name: string;
  user_password: string;
  address_id: number | null;
  address_street: string | null;
  address_city: string | null;
  address_country: string | null;
}
class PostWithAuthorModel extends PostModel {
  author: UserModel;
  constructor(postData: PostWithAuthorModelData) {
    super(postData);
    this.author = new UserModel({
      id: postData.user_id,
      email: postData.user_email,
      name: postData.user_name,
      password: postData.user_password,
      ...postData,
    });
  }
}

export default PostWithAuthorModel;
