import 'package:flutter/material.dart';
import 'package:mybarber/src/receipts/providers/receipt_provider.dart';
import 'package:mybarber/src/receipts/widgets/receipts_widget.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:provider/provider.dart';

class ReceiptList extends StatefulWidget {
  const ReceiptList({Key? key}) : super(key: key);

  @override
  _ReceiptListState createState() => _ReceiptListState();
}

class _ReceiptListState extends State<ReceiptList> {
  late Future<void> _loadReceiptFuture;

  @override
  void initState() {
    super.initState();
    final provider = Provider.of<ReceiptProvider>(context, listen: false);
    _loadReceiptFuture = provider.loadReceipt();
  }

  @override
  Widget build(BuildContext context) {
    final receiptsProvider = Provider.of<ReceiptProvider>(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Receipts',
          style: TextStyle(color: mainColor),
        ),
      ),
      body: FutureBuilder(
          future: _loadReceiptFuture,
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
                  itemCount: receiptsProvider.receipts.length,
                  itemBuilder: (context, index) {
                    return receiptWidget(
                        receiptsProvider.receipts[index], context);
                  });
            }
          }),
      floatingActionButton: FloatingActionButton(
        tooltip: "Add new receipt",
        onPressed: () {},
        shape: const CircleBorder(),
        backgroundColor: Colors.green[400],
        child: const Icon(
          Icons.add,
          color: Colors.white,
        ),
      ),
    );
  }
}
