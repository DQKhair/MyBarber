class Category {
  final int category_ID;
  final String categoryName;

  Category({required this.category_ID, required this.categoryName});

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
        category_ID: json['category_ID'], categoryName: json['categoryName']);
  }

  Map<String, dynamic> toJson() {
    return {
      'category_ID': category_ID,
      'categoryName': categoryName,
    };
  }
}
