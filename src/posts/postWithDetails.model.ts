import PostModel, { PostModelData } from './post.model';
import UserModel from '../users/user.model';

interface PostWithDetailsModelData extends PostModelData {
  user_id: number;
  user_email: string;
  user_name: string;
  user_password: string;
  address_id: number | null;
  address_street: string | null;
  address_city: string | null;
  address_country: string | null;
  category_ids: number[] | null;
}
class PostWithDetails extends PostModel {
  author: UserModel;
  categoryIds: number[];
  constructor(postData: PostWithDetailsModelData) {
    super(postData);
    this.author = new UserModel({
      ...postData,
      id: postData.user_id,
      email: postData.user_email,
      name: postData.user_name,
      password: postData.user_password,
    });
    this.categoryIds = postData.category_ids || [];
  }
}

export default PostWithDetails;
