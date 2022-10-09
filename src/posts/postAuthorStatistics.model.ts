export interface PostAuthorStatisticsModelData {
  author_id: number;
  posts_count: number;
}
class PostAuthorStatisticsModel {
  authorId: number;
  postsCount: number;
  constructor(postAuthorStatisticsData: PostAuthorStatisticsModelData) {
    this.authorId = postAuthorStatisticsData.author_id;
    this.postsCount = postAuthorStatisticsData.posts_count;
  }
}

export default PostAuthorStatisticsModel;
