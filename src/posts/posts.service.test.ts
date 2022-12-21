import PostDto from './post.dto';
import { Test } from '@nestjs/testing';
import DatabaseService from '../database/database.service';
import { PostsService } from './posts.service';
import PostWithCategoryIdsModel, {
  PostWithCategoryIdsModelData,
} from './postWithCategoryIds.model';
import PostsRepository from './posts.repository';
import PostsStatisticsRepository from './postsStatistics.repository';
import PostsSearchRepository from './postsSearch.repository';
import PostModel, { PostModelData } from './post.model';

describe('The PostsService', () => {
  let postData: PostDto;
  let runQueryMock: jest.Mock;
  let postsService: PostsService;
  beforeEach(async () => {
    runQueryMock = jest.fn();

    const module = await Test.createTestingModule({
      providers: [
        PostsService,
        PostsRepository,
        PostsStatisticsRepository,
        PostsSearchRepository,
        {
          provide: DatabaseService,
          useValue: {
            runQuery: runQueryMock,
          },
        },
      ],
    }).compile();

    postsService = await module.get(PostsService);
  });
  describe('when calling the create method with category ids', () => {
    let sqlQueryResult: PostWithCategoryIdsModelData;
    beforeEach(() => {
      postData = {
        title: 'Hello world!',
        content: 'Lorem ipsum',
        categoryIds: [1, 2, 3],
      };
      sqlQueryResult = {
        id: 1,
        author_id: 2,
        title: postData.title,
        post_content: postData.content,
        category_ids: postData.categoryIds,
      };
      runQueryMock.mockResolvedValue({
        rows: [sqlQueryResult],
      });
    });
    it('should return an instance of the PostWithCategoryIdsModel', async () => {
      const result = await postsService.createPost(postData, 1);

      expect(result instanceof PostWithCategoryIdsModel).toBe(true);
    });
    it('should return an object with the correct properties', async () => {
      const result = (await postsService.createPost(
        postData,
        1,
      )) as PostWithCategoryIdsModel;

      expect(result.id).toBe(sqlQueryResult.id);
      expect(result.authorId).toBe(sqlQueryResult.author_id);
      expect(result.title).toBe(sqlQueryResult.title);
      expect(result.content).toBe(sqlQueryResult.post_content);
      expect(result.categoryIds).toBe(sqlQueryResult.category_ids);
    });
  });
  describe('when calling the create method without category ids', () => {
    let sqlQueryResult: PostModelData;
    beforeEach(() => {
      postData = {
        title: 'Hello world!',
        content: 'Lorem ipsum',
      };
      sqlQueryResult = {
        id: 1,
        author_id: 2,
        title: postData.title,
        post_content: postData.content,
      };
      runQueryMock.mockResolvedValue({
        rows: [sqlQueryResult],
      });
    });
    it('should return an instance of the PostModel', async () => {
      const result = await postsService.createPost(postData, 1);

      expect(result instanceof PostModel).toBe(true);
    });
    it('should return an object with the correct properties', async () => {
      const result = await postsService.createPost(postData, 1);

      expect(result.id).toBe(sqlQueryResult.id);
      expect(result.authorId).toBe(sqlQueryResult.author_id);
      expect(result.title).toBe(sqlQueryResult.title);
      expect(result.content).toBe(sqlQueryResult.post_content);
    });
  });
});
