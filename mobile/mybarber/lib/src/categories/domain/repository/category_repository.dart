import 'package:mybarber/src/categories/domain/models/category_model.dart';
import 'package:mybarber/src/categories/domain/services/category_services.dart';

class CategoryRepository {

  final CategoryServices categoryService = CategoryServices();

  Future<List<Category>> getCategoriesRepository() async {
    List<dynamic> data = await categoryService.fetchCategories();
    return data.map((category) => Category.fromJson(category)).toList();
  }

  Future<Category> getCategoryByIdRepository(int categoryId) async {
    return await categoryService.getCategoryById(categoryId);
  }

  Future<void> addCategoryRepository(Category category) async {
    await categoryService.addCategory(category);
  }

  Future<void> deleteCategoryRepository(int categoryId) async {
    await categoryService.deleteCategory(categoryId);
  }

  Future<void> updateCategoryRepository(
      int categoryId, Category category) async {
    await categoryService.updateCategory(categoryId, category);
  }
}
