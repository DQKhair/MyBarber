import 'dart:convert';

import 'package:mybarber/src/categories/domain/models/category_model.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:http/http.dart' as http;

class CategoryServices {
  
  final String apiURL = '${HOST_API}/api/Categories';

  Future<List<dynamic>> fetchCategories() async {
    final response = await http.get(
      Uri.parse(apiURL),
      headers: <String, String>{
        'Authorization': 'Bearer $TOKEN',
        'Content-Type': 'application/json',
      },
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Fail to load categories');
    }
  }

  Future<Category> getCategoryById(int categoryId) async {
    final response = await http.get(
      Uri.parse('$apiURL/$categoryId'),
      headers: <String, String>{
        'Authorization': 'Bearer $TOKEN',
        'Content-Type': 'application/json',
      },
    );
    if (response.statusCode == 200) {
      return Category.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Fail to get category by id');
    }
  }

  Future<void> addCategory(Category category) async {
    final response = await http.post(Uri.parse(apiURL),
        headers: <String, String>{
          'Authorization': 'Bearer $TOKEN',
          'Content-Type': 'application/json',
        },
        body: jsonEncode(category.toJson()));
    if (response.statusCode != 201) {
      throw Exception('Fail to add category');
    }
  }

  Future<void> updateCategory(int categoryId, Category category) async {
    final response = await http.put(Uri.parse('$apiURL/$categoryId'),
        headers: <String, String>{
          'Authorization': 'Bearer $TOKEN',
          'Content-Type': 'application/json',
        },
        body: jsonEncode(category.toJson()));
    if (response.statusCode != 200) {
      throw Exception('Fail to update category');
    }
  }

  Future<void> deleteCategory(int categoryId) async {
    final response = await http
        .delete(Uri.parse('$apiURL/$categoryId'), headers: <String, String>{
      'Authorization': 'Bearer $TOKEN',
      'Content-Type': 'application/json',
    });
    if (response.statusCode != 200) {
      throw Exception('Fail to delete category');
    }
  }
}
