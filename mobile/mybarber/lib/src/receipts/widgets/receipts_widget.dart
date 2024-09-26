import 'package:flutter/material.dart';

class ReceiptsWidget extends StatefulWidget {
  const ReceiptsWidget({ Key? key }) : super(key: key);

  @override
  _ReceiptsWidgetState createState() => _ReceiptsWidgetState();
}

class _ReceiptsWidgetState extends State<ReceiptsWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
       child: const Text("Receipts"),
    );
  }
}