import 'package:flutter/material.dart';
import 'package:mybarber/src/receipts/domain/model/receipt_create_model.dart';
import 'package:mybarber/src/receipts/domain/model/receipt_model.dart';
import 'package:mybarber/src/receipts/domain/repository/receipt_repository.dart';

class ReceiptProvider with ChangeNotifier {
  List<Receipt> _receipts = [];
  bool _loading = false;
  final ReceiptRepository _receiptRepository = ReceiptRepository();

  List<Receipt> get receipts => _receipts;
  bool get loading => _loading;

  Future<void> loadReceipt() async {
    _loading = true;
    try {
      _receipts = await _receiptRepository.getReceiptsRepository();
      notifyListeners();
    } catch (error) {
      print('Error loading receipts: $error');
      throw Exception(error);
    } finally {
      _loading = false;
    }
  }

  Future<bool> createNewReceiptProvider(
      String employeeId, ReceiptCreateModel receiptCreateModel) async {
    _loading = true;
    try {
      await _receiptRepository.createNewReceiptRepository(
          employeeId, receiptCreateModel);
      await loadReceipt();
      return true;
    } catch (error) {
      print('Error update confirm haircut: $error');
      return false;
    } finally {
      _loading = false;
    }
  }

  Future<bool> confirmHaircutProvider(
      String receiptId, String employeeId) async {
    _loading = true;
    try {
      await _receiptRepository.confirmHaircutRepository(receiptId, employeeId);
      await loadReceipt();
      return true;
    } catch (error) {
      print('Error update confirm haircut: $error');
      return false;
    } finally {
      _loading = false;
    }
  }

  Future<bool> confirmHairWashProvider(
      String receiptId, String employeeId) async {
    _loading = true;
    try {
      await _receiptRepository.confirmHairWashRepository(receiptId, employeeId);
      await loadReceipt();
      return true;
    } catch (error) {
      print('Error update confirm hair wash: $error');
      return false;
    } finally {
      _loading = false;
    }
  }

  Future<bool> confirmFinishedProvider(String receiptId) async {
    _loading = true;
    try {
      await _receiptRepository.confirmFinishedRepository(receiptId);
      await loadReceipt();
      return true;
    } catch (error) {
      print('Error update confirm finished: $error');
      return false;
    } finally {
      _loading = false;
    }
  }

  Future<bool> confirmPaymentCompletedProvider(
      String receiptId, String methodName) async {
    _loading = true;
    try {
      await _receiptRepository.confirmPaymentCompletedRepository(
          receiptId, methodName);
      await loadReceipt();
      return true;
    } catch (error) {
      print('Error update confirm payment completed: $error');
      return false;
    } finally {
      _loading = false;
    }
  }
}
