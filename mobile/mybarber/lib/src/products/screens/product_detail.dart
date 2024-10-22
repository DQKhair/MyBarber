import 'package:flutter/material.dart';
import 'package:mybarber/src/products/domain/model/product_model.dart';
import 'package:mybarber/src/utils/env.dart';

class ProductDetail extends StatelessWidget {
  final Product product;
  const ProductDetail({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Product details',
          style: TextStyle(color: mainColor),
        ),
      ),
      body: SingleChildScrollView(
        child: Container(
          padding: const EdgeInsets.all(36),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      SizedBox(
                        width: MediaQuery.of(context).size.width * 0.6,
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: Image.network(
                            '${HOST_API}/${product.productImage}',
                            fit: BoxFit.contain,
                          ),
                        ),
                      )
                    ],
                  ),
                  const SizedBox(
                    height: 36,
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.key_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Expanded(child: Text('ID: ${product.product_ID}')),
                    ],
                  ),
                  const SizedBox(
                    height: 16,
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.tag,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Expanded(child: Text("Name: ${product.productName}"))
                    ],
                  )
                ],
              ),
              const SizedBox(height: 26),
              Column(
                children: [
                  Row(
                    children: [
                      const Icon(
                        Icons.price_change_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Expanded(child: Text('Price: ${product.productPrice}')),
                    ],
                  ),
                  const SizedBox(
                    height: 26,
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.description_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Expanded(
                          child: Text(
                              "Description: ${product.productDescription}"))
                    ],
                  ),
                  const SizedBox(
                    height: 26,
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.description_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Expanded(
                          child: Text("Category ID: ${product.category_ID}"))
                    ],
                  )
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
