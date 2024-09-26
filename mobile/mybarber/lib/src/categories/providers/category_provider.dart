import 'package:flutter/material.dart';
import 'package:mybarber/src/categories/domain/models/category_model.dart';
import 'package:mybarber/src/categories/domain/repository/category_repository.dart';

class CategoryProvider with ChangeNotifier {
  List<Category> _categories = [];
  final CategoryRepository _categoryRepository = CategoryRepository();

  List<Category> get categories => _categories;

  Future<void> loadCategories() async {
    try {
      _categories = await _categoryRepository.getCategoriesRepository();
      notifyListeners();
    } catch (e) {
      print('Error loading categories: $e');
      throw Exception(e);
    }
  }

  Future<Category> getCategoryByIdProvider(int categoryId) async {
    return await _categoryRepository.getCategoryByIdRepository(categoryId);
  }

  Future<void> addCategoryProvider(Category category) async {
    await _categoryRepository.addCategoryRepository(category);
    await loadCategories();
  }

  Future<void> deleteCategoryProvider(int categoryId) async {
    await _categoryRepository.deleteCategoryRepository(categoryId);
    await loadCategories();
  }

  Future<void> updateCategoryProvider(int categoryId, Category category) async {
    await _categoryRepository.updateCategoryRepository(categoryId, category);
    await loadCategories();
  }
}
