import 'package:flutter/material.dart';
import 'package:mybarber/src/categories/providers/category_provider.dart';
import 'package:provider/provider.dart';

class CategoryDetailScreen extends StatelessWidget {
  final int categoryId;
  const CategoryDetailScreen({Key? key, required this.categoryId})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<CategoryProvider>(context);

    return FutureBuilder(
      future: provider.getCategoryByIdProvider(categoryId),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(
            child: CircularProgressIndicator(),
          );
        }
        if (snapshot.hasError) {
          return Center(
            child: Text('Error: $snapshot.error'),
          );
        }

        final category = snapshot.data;

        return Scaffold(
          appBar: AppBar(
            title: Text(category!.categoryName),
            actions: [
              IconButton(
                icon: Icon(Icons.edit),
                onPressed: () {
                  // Navigator.of(context).push(MaterialPageRoute(
                  //   builder: (context) =>
                  //       CategoryEditScreen(category: category),
                  // ));
                },
              ),
              IconButton(
                icon: Icon(Icons.delete),
                onPressed: () async {
                  await provider.deleteCategoryProvider(category.category_ID);
                  Navigator.of(context).pop(); // Quay lại màn hình danh sách
                },
              ),
            ],
          ),
          body: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text('Cateogry ID: ${category.category_ID}'),
          ),
        );
      },
    );
  }
}
