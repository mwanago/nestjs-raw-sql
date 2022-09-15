import PostModel, { PostModelData } from './post.model';

interface PostWithCategoryIdsModelData extends PostModelData {
  category_ids: number[] | null;
}
class PostWithCategoryIdsModel extends PostModel {
  categoryIds: number[];
  constructor(postData: PostWithCategoryIdsModelData) {
    super(postData);
    this.categoryIds = postData.category_ids || [];
  }
}

export default PostWithCategoryIdsModel;
