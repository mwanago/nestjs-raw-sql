export interface PostAuthorStatisticsModelData {
  author_id: number;
  posts_count: number;
  longest_post_length: number;
  shortest_post_length: number;
  all_posts_content_sum: number;
  average_post_content_length: number;
}
class PostAuthorStatisticsModel {
  authorId: number;
  postsCount: number;
  longestPostLength: number;
  shortestPostLength: number;
  allPostsContentSum: number;
  averagePostContentLength: number;
  constructor(postAuthorStatisticsData: PostAuthorStatisticsModelData) {
    this.authorId = postAuthorStatisticsData.author_id;
    this.postsCount = postAuthorStatisticsData.posts_count;
    this.longestPostLength = postAuthorStatisticsData.longest_post_length;
    this.shortestPostLength = postAuthorStatisticsData.shortest_post_length;
    this.allPostsContentSum = postAuthorStatisticsData.all_posts_content_sum;
    this.averagePostContentLength =
      postAuthorStatisticsData.average_post_content_length;
  }
}

export default PostAuthorStatisticsModel;
