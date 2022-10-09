export interface PostAuthorStatisticsModelData {
  author_id: number;
  posts_count: number;
  longest_post_length: number;
  shortest_post_length: number;
  all_posts_content_sum: number;
}
class PostAuthorStatisticsModel {
  authorId: number;
  postsCount: number;
  longestPostLength: number;
  shortestPostLength: number;
  allPostsContentSum: number;
  constructor(postAuthorStatisticsData: PostAuthorStatisticsModelData) {
    this.authorId = postAuthorStatisticsData.author_id;
    this.postsCount = postAuthorStatisticsData.posts_count;
    this.longestPostLength = postAuthorStatisticsData.longest_post_length;
    this.shortestPostLength = postAuthorStatisticsData.shortest_post_length;
    this.allPostsContentSum = postAuthorStatisticsData.all_posts_content_sum;
  }
}

export default PostAuthorStatisticsModel;
