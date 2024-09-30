import 'package:mybarber/src/categories/domain/models/category_model.dart';
import 'package:mybarber/src/categories/domain/services/category_services.dart';

class CategoryRepository {
  final CategoryServices categoryService = CategoryServices();

  Future<List<Category>> getCategoriesRepository() async {
    List<dynamic> data = await categoryService.fetchCategories();
    return data.map((category) => Category.fromJson(category)).toList();
  }
}
