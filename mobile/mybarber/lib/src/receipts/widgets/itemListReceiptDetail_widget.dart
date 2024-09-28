import 'package:flutter/material.dart';
import 'package:mybarber/src/receipts/domain/model/receiptDetails_model.dart';

Widget itemListReceiptDetail(ReceiptDetails item, int index) {
  return Padding(
    padding: const EdgeInsets.symmetric(vertical: 8.0),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text((index + 1).toString()),
        Text(item.productName),
        Text('Quantity: ${item.productQuantity}'),
        Text('Price: ${item.productPrice}')
      ],
    ),
  );
}
