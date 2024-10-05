import 'package:mybarber/src/receipts/domain/model/receipt_create_model.dart';
import 'package:mybarber/src/receipts/domain/model/receipt_model.dart';
import 'package:mybarber/src/receipts/domain/services/receipt_services.dart';

class ReceiptRepository {
  final ReceiptServices receiptServices = ReceiptServices();

  Future<List<Receipt>> getReceiptsRepository() async {
    List<dynamic> data = await receiptServices.fetchReceipts();
    return data.map((receipt) => Receipt.fromJson(receipt)).toList();
  }

  Future<void> createNewReceiptRepository(
      String employeeId, ReceiptCreateModel receiptCreateModel) async {
    await receiptServices.createNewReceipt(employeeId, receiptCreateModel);
  }

  Future<void> confirmHaircutRepository(
      String receiptId, String employeeId) async {
    await receiptServices.confirmHaircut(receiptId, employeeId);
  }

  Future<void> confirmHairWashRepository(
      String receiptId, String employeeId) async {
    await receiptServices.confirmHairWash(receiptId, employeeId);
  }

  Future<void> confirmFinishedRepository(String receiptId) async {
    await receiptServices.confirmFinished(receiptId);
  }

  Future<void> confirmPaymentCompletedRepository(
      String receiptId, String methodName) async {
    await receiptServices.confirmPaymentCompleted(receiptId, methodName);
  }
}
