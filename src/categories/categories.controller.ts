import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import FindOneParams from '../utils/findOneParams';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import CategoriesService from './categories.service';
import CategoryDto from './category.dto';

@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export default class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  getCategoryById(@Param() { id }: FindOneParams) {
    return this.categoriesService.getCategoryById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)
  updateCategory(
    @Param() { id }: FindOneParams,
    @Body() categoryData: CategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, categoryData);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  createCategory(@Body() categoryData: CategoryDto) {
    return this.categoriesService.createCategory(categoryData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  deleteCategory(@Param() { id }: FindOneParams) {
    return this.categoriesService.deleteCategory(id);
  }
}
