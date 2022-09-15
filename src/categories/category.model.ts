export interface CategoryModelData {
  id: number;
  name: string;
}
class CategoryModel {
  id: number;
  name: string;
  constructor(categoryData: CategoryModelData) {
    this.id = categoryData.id;
    this.name = categoryData.name;
  }
}

export default CategoryModel;
