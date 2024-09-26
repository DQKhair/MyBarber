import 'package:flutter/material.dart';
import 'package:mybarber/src/categories/domain/models/category_model.dart';
import 'package:mybarber/src/utils/env.dart';

Widget categoryWidget(Category category, BuildContext context) {
  return GestureDetector(
    onTap: () {},
    child: Card(
        child: Padding(
      padding: const EdgeInsets.all(12),
      child: Row(
        children: [
          Container(
            height: 40.0,
            width: 40.0,
            alignment: Alignment.center,
            child: const Icon(
              Icons.category_outlined,
              color: mainColor,
            ),
          ),
          const SizedBox(width: 20.0),
          Expanded(
              child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Category: ${category.categoryName}",
                style:
                    const TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 4.0),
            ],
          )),
          Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              IconButton(
                onPressed: () {},
                icon: const Icon(Icons.edit),
                color: Colors.yellow[700],
              ),
              IconButton(
                onPressed: () {},
                icon: const Icon(Icons.delete),
                color: Colors.red,
              )
            ],
          )
        ],
      ),
    )),
  );
}
