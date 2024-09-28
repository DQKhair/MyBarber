import 'package:flutter/material.dart';

Widget formTitle(String title, String subTitle) {
  return Container(
    padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 50),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          textAlign: TextAlign.start,
          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
        ),
        Text(
          subTitle,
          style: TextStyle(fontSize: 15, color: Colors.grey[600]),
        )
      ],
    ),
  );
}
