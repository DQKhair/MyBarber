import 'package:mybarber/src/products/domain/model/product_model.dart';
import 'package:mybarber/src/servicesItem/domain/model/serviceItem.dart';

class ReceiptCreateModel {
  final String customerName;
  final String customerPhone;
  final String customerAddress;
  final List<Product> productsInput;
  final List<int> productsQuantityInput;
  final List<ServiceItem> servicesInput;

  ReceiptCreateModel({
    required this.customerName,
    required this.customerPhone,
    required this.customerAddress,
    required this.productsInput,
    required this.productsQuantityInput,
    required this.servicesInput,
  });

  factory ReceiptCreateModel.fromJson(Map<String, dynamic> json) {
    return ReceiptCreateModel(
      customerName: json['customerName'],
      customerPhone: json['customerPhone'],
      customerAddress: json['customerAddress'],
      productsInput: (json['productsInput'] as List<dynamic>)
          .map((product) => Product.fromJson(product))
          .toList(),
      productsQuantityInput: List<int>.from(json['productsQuantityInput']),
      servicesInput: (json['servicesInput'] as List<dynamic>)
          .map((service) => ServiceItem.fromJson(service))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'customerName': customerName,
      'customerPhone': customerPhone,
      'customerAddress': customerAddress,
      'productsInput':
          productsInput.map((product) => product.toJson()).toList(),
      'productsQuantityInput': productsQuantityInput,
      'servicesInput':
          servicesInput.map((service) => service.toJson()).toList(),
    };
  }
}
