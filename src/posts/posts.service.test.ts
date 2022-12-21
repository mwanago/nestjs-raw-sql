import PostDto from './post.dto';
import { Test } from '@nestjs/testing';
import DatabaseService from '../database/database.service';
import { PostsService } from './posts.service';
import PostWithCategoryIdsModel from './postWithCategoryIds.model';
import PostsRepository from './posts.repository';
import PostsStatisticsRepository from './postsStatistics.repository';
import PostsSearchRepository from './postsSearch.repository';

describe('The PostsService', () => {
  describe('when calling the create method with category ids', () => {
    it('should return an instance of the PostWithCategoryIdsModel', async () => {
      const postData: PostDto = {
        title: 'Hello world!',
        content: 'Lorem ipsum',
        categoryIds: [1, 2, 3],
      };

      const runQueryMock = jest.fn();
      runQueryMock.mockResolvedValue({
        rows: [postData],
      });

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

      const postsService = await module.get(PostsService);

      const result = await postsService.createPost(postData, 1);

      expect(result instanceof PostWithCategoryIdsModel).toBe(true);
    });
  });
});
