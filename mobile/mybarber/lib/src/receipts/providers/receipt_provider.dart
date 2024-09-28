import 'package:flutter/material.dart';
import 'package:mybarber/src/receipts/domain/model/receipt_model.dart';
import 'package:mybarber/src/receipts/domain/repository/receipt_repository.dart';

class ReceiptProvider with ChangeNotifier {
  List<Receipt> _receipts = [];
  final ReceiptRepository _receiptRepository = ReceiptRepository();

  List<Receipt> get receipts => _receipts;

  Future<void> loadReceipt() async {
    try {
      _receipts = await _receiptRepository.getReceiptsRepository();
    } catch (error) {
      print('Error loading receipts: $error');
      throw Exception(error);
    }
  }
}
