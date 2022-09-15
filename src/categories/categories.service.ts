import { Injectable } from '@nestjs/common';
import CategoriesRepository from './categories.repository';
import CategoryDto from './category.dto';

@Injectable()
class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getCategories() {
    return this.categoriesRepository.getAll();
  }

  getCategoryById(id: number) {
    return this.categoriesRepository.getById(id);
  }

  createCategory(categoryData: CategoryDto) {
    return this.categoriesRepository.create(categoryData);
  }

  updateCategory(id: number, categoryData: CategoryDto) {
    return this.categoriesRepository.update(id, categoryData);
  }

  deleteCategory(id: number) {
    return this.categoriesRepository.delete(id);
  }
}

export default CategoriesService;
