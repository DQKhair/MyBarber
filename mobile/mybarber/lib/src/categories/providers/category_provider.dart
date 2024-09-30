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
}
