import 'package:flutter/material.dart';

class NotFoundWidget extends StatelessWidget {
  final String title;
  const NotFoundWidget({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        'Not found 404 ! $title',
        style: const TextStyle(fontSize: 30),
        selectionColor: Colors.grey,
      ),
    );
  }
}
