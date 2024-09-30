import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mybarber/src/receipts/domain/model/receiptDetails_model.dart';

Widget itemListReceiptDetail(ReceiptDetails item, int index) {
  NumberFormat numberFormat =
      NumberFormat.currency(locale: 'vi_VN', symbol: 'đ');
  return Padding(
    padding: const EdgeInsets.symmetric(vertical: 8.0),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(child: Text((index + 1).toString())),
        Expanded(child: Text(item.productName)),
        Expanded(child: Text('  x${item.productQuantity}')),
        Expanded(
            child: Text(
          numberFormat.format(item.productPrice),
          style: const TextStyle(color: Colors.red),
        ))
      ],
    ),
  );
}
