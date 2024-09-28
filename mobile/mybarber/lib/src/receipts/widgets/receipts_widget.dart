import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mybarber/src/receipts/domain/model/receipt_model.dart';
import 'package:mybarber/src/receipts/screens/receipt_detail.dart';
import 'package:mybarber/src/utils/env.dart';

void _navigateToReceiptDetail(Receipt receipt, BuildContext context) {
  Navigator.push(context,
      MaterialPageRoute(builder: (context) => ReceiptDetail(receipt: receipt)));
}

Widget receiptWidget(Receipt receipt, BuildContext context) {
  final NumberFormat currencyFormat =
      NumberFormat.currency(locale: 'vi_VN', symbol: 'đ');
  return GestureDetector(
    onTap: () {
      _navigateToReceiptDetail(receipt, context);
    },
    child: Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      elevation: 8,
      child: Container(
        decoration: BoxDecoration(
          gradient: const LinearGradient(
              colors: [Colors.white,mainColor],
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
                  Icons.receipt_long_outlined,
                  color: mainColor,
                ),
              ),
              const SizedBox(width: 20.0),
              Expanded(
                  child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    receipt.customerName,
                    style: const TextStyle(
                        fontSize: 18, fontWeight: FontWeight.w500),
                  ),
                  const SizedBox(height: 4.0),
                ],
              )),
              const SizedBox(width: 20.0),
              Expanded(
                  child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "${currencyFormat.format(receipt.totalPrice)} ",
                    style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                        color: Colors.red),
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
                ],
              )
            ],
          ),
        ),
      ),
    ),
  );
}
