import { Module } from '@nestjs/common';
import CategoriesRepository from './categories.repository';
import CategoriesController from './categories.controller';
import CategoriesService from './categories.service';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
