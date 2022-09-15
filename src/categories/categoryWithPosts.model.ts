import CategoryModel, { CategoryModelData } from './category.model';
import PostModel, { PostModelData } from '../posts/post.model';

export interface CategoryWithPostsModelData extends CategoryModelData {
  posts: PostModelData[];
}
class CategoryWithPostsModel extends CategoryModel {
  posts: PostModel[];
  constructor(categoryData: CategoryWithPostsModelData) {
    super(categoryData);
    this.posts = categoryData.posts.map((postData) => {
      return new PostModel(postData);
    });
  }
}

export default CategoryWithPostsModel;
