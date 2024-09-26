class ServiceItem {
  final String service_ID;
  final String serviceName;
  final double servicePrice;
  final String serviceImage;
  final String serviceDescription;
  final int category_ID;

  ServiceItem(
      {required this.service_ID,
      required this.serviceName,
      required this.servicePrice,
      required this.serviceImage,
      required this.serviceDescription,
      required this.category_ID});

  factory ServiceItem.fromJson(Map<String, dynamic> json) {
    return ServiceItem(
        service_ID: json['itemCategory_ID'],
        serviceName: json['itemCategoryName'],
        servicePrice: json['itemCategoryPrice'],
        serviceDescription: json['itemCategoryDescription'],
        serviceImage: json['itemCategoryImage'],
        category_ID: json['category_ID']);
  }

  Map<String, dynamic> toJson() {
    return {
      'itemCategory_ID': service_ID,
      'itemCategoryName': serviceName,
      'itemCategoryPrice': servicePrice,
      'itemCategoryDescription': serviceDescription,
      'itemCategoryImage': serviceImage,
      'category_ID': category_ID,
    };
  }
}