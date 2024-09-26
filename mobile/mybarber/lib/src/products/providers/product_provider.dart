import 'package:flutter/material.dart';
import 'package:mybarber/src/products/domain/model/product_model.dart';
import 'package:mybarber/src/products/domain/repository/product_repository.dart';

class ProductProvider with ChangeNotifier {
  List<Product> _products = [];
  final ProductRepository _productRepository = ProductRepository();

  List<Product> get products => _products;

   Future<void> loadProducts() async {
    try {
      _products = await _productRepository.getProductRepository();
      notifyListeners();
    } catch (error) {
      print('Error loading items: $error');
      throw Exception(error);
    }
  }
}