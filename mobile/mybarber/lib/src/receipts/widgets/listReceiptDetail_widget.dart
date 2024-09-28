import 'package:flutter/material.dart';
import 'package:mybarber/src/receipts/domain/model/receipt_model.dart';
import 'package:mybarber/src/receipts/widgets/itemListReceiptDetail_widget.dart';
import 'package:mybarber/src/utils/env.dart';

Widget listReceiptDetail(Receipt receipt) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      const SizedBox(
        height: 20,
      ),
      const Text(
        'Detail',
        style: TextStyle(
            fontSize: 20, fontWeight: FontWeight.bold, color: mainColor),
      ),
      const SizedBox(
        height: 16,
      ),
      ListView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: receipt.listReceiptDetailsVM.length,
        itemBuilder: (context, index) {
          final item = receipt.listReceiptDetailsVM[index];
          return itemListReceiptDetail(item, index);
        },
      )
    ],
  );
}
