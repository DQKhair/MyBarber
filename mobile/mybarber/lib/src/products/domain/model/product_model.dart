class Product {
  final String product_ID;
  final String productName;
  final int productPrice;
  final String productImage;
  final String productDescription;
  final int category_ID;

  Product(
      {required this.product_ID,
      required this.productName,
      required this.productPrice,
      required this.productImage,
      required this.productDescription,
      required this.category_ID});

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
        product_ID: json['itemCategory_ID'],
        productName: json['itemCategoryName'],
        productPrice: json['itemCategoryPrice'],
        productDescription: json['itemCategoryDescription'],
        productImage: json['itemCategoryImage'],
        category_ID: json['category_ID'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'itemCategory_ID': product_ID,
      'itemCategoryName': productName,
      'itemCategoryPrice': productPrice,
      'itemCategoryDescription': productDescription,
      'itemCategoryImage': productImage,
      'category_ID': category_ID,
    };
  }
}
