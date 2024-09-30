import 'package:flutter/material.dart';
import 'package:mybarber/src/products/providers/product_provider.dart';
import 'package:mybarber/src/products/widgets/product_widget.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:provider/provider.dart';

class ProductList extends StatefulWidget {
  const ProductList({Key? key}) : super(key: key);

  @override
  _ProductListState createState() => _ProductListState();
}

class _ProductListState extends State<ProductList> {
  late Future<void> _loadProductFuture;

  @override
  void initState() {
    super.initState();
    final provider = Provider.of<ProductProvider>(context, listen: false);
    _loadProductFuture = provider.loadProducts();
  }

  @override
  Widget build(BuildContext context) {
    final productsProvider = Provider.of<ProductProvider>(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Products',
          style: TextStyle(color: mainColor),
        ),
      ),
      body: FutureBuilder(
          future: _loadProductFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            } else if (snapshot.hasError) {
              return Center(
                child: Text('Error: ${snapshot.error}'),
              );
            } else {
              return ListView.builder(
                itemCount: productsProvider.products.length,
                itemBuilder: (context, index) {
                  return ProductWidget(
                      productsProvider.products[index], context);
                },
              );
            }
          }),
    );
  }
}
