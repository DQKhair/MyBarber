import 'dart:convert';

import 'package:mybarber/src/receipts/domain/model/receipt_create_model.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:mybarber/src/utils/httpConf.dart';

class ReceiptServices {
  final String endpoint = 'api/Receipts';

  HttpMethod httpMethod = HttpMethod(baseUrl: HOST_API);

  Future<List<dynamic>> fetchReceipts() async {
    final response = await httpMethod.get(endpoint);
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Fail to load receipts');
    }
  }

  Future<void> createNewReceipt(
      String employeeId, ReceiptCreateModel receiptCreateModel) async {
    final response = await httpMethod.post(
        '$endpoint/$employeeId', receiptCreateModel.toJson());
    if (response.statusCode != 201) {
      throw Exception('Error create new receipt');
    }
  }

  Future<void> confirmHaircut(String receiptId, String employeeId) async {
    final response = await httpMethod
        .putNoBody('$endpoint/confirm_haircut/receiptId=$receiptId&&EmployeeId=$employeeId');
    if (response.statusCode != 200) {
      throw Exception('Error update confirm haircut');
    }
  }

  Future<void> confirmHairWash(String receiptId, String employeeId) async {
    final response = await httpMethod
        .putNoBody('$endpoint/confirm_hair_wash/receiptId=$receiptId&&EmployeeId=$employeeId');
    if (response.statusCode != 200) {
      throw Exception('Error update confirm hair wash');
    }
  }

  Future<void> confirmFinished(String receiptId) async {
    final response = await httpMethod.putNoBody('$endpoint/confirm_finished/receiptId=$receiptId');
    if (response.statusCode != 200) {
      throw Exception('Error update confirm finished');
    }
  }

  Future<void> confirmPaymentCompleted(
      String receiptId, String methodName) async {
    final response = await httpMethod
        .putNoBody('$endpoint/confirm_payment_completed/receiptId=$receiptId&&method=$methodName');
    if (response.statusCode != 200) {
      throw Exception('Error update confirm payment completed');
    }
  }
}
