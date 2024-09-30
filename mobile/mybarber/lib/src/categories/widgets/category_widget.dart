import 'package:flutter/material.dart';
import 'package:mybarber/src/categories/domain/models/category_model.dart';
import 'package:mybarber/src/utils/env.dart';

Widget categoryWidget(Category category, BuildContext context) {
  return GestureDetector(
    onTap: () {},
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
                    Icons.category_outlined,
                    color: mainColor,
                  ),
                ),
                const SizedBox(width: 20.0),
                Expanded(
                    child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "${category.category_ID} - ",
                      style: const TextStyle(
                          fontSize: 18, fontWeight: FontWeight.w500),
                    ),
                    const SizedBox(height: 4.0),
                    Text(
                      "${category.categoryName} ",
                      style: const TextStyle(
                          fontSize: 18, fontWeight: FontWeight.w500),
                    ),
                    const SizedBox(height: 4.0),
                  ],
                )),
              ],
            ),
          ),
        )),
  );
}
