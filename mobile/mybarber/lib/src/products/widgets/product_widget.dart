import 'package:flutter/material.dart';
import 'package:mybarber/src/products/domain/model/product_model.dart';
import 'package:mybarber/src/products/screens/product_detail.dart';
import 'package:mybarber/src/utils/env.dart';

void _navigateToProductDetail(Product product, BuildContext context) {
  Navigator.push(context,
      MaterialPageRoute(builder: (context) => ProductDetail(product: product)));
}

Widget ProductWidget(Product product, BuildContext context) {
  return GestureDetector(
    onTap: () {
      _navigateToProductDetail(product, context);
    },
    child: Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      elevation: 8,
      child: Container(
        decoration: BoxDecoration(
          gradient: const LinearGradient(
              colors: [Colors.white, mainColor],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight),
          borderRadius: BorderRadius.circular(15),
        ),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              Container(
                height: 40.0,
                width: 40.0,
                alignment: Alignment.center,
                child: const Icon(
                  Icons.auto_awesome_outlined,
                  color: mainColor,
                ),
              ),
              const SizedBox(width: 20.0),
              Expanded(
                  child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "${product.productName} ",
                    style: const TextStyle(
                        fontSize: 18, fontWeight: FontWeight.w500),
                  ),
                  const SizedBox(height: 4.0),
                ],
              )),
            ],
          ),
        ),
      ),
    ),
  );
}
