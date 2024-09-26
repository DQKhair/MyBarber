import 'package:mybarber/src/products/domain/model/product_model.dart';
import 'package:mybarber/src/products/domain/services/product_services.dart';

class ProductRepository {
  final ProductServices productServices = ProductServices();

  Future<List<Product>> getProductRepository() async {
    List<dynamic> data = await productServices.fetchItemCategory();
    return data
        .map((product) => Product.fromJson(product))
        .where((product) => product.category_ID != 1)
        .toList();
  }
}
