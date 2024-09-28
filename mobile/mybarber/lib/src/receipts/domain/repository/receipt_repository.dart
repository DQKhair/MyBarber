import 'package:mybarber/src/receipts/domain/model/receipt_model.dart';
import 'package:mybarber/src/receipts/domain/services/receipt_services.dart';

class ReceiptRepository {
  final ReceiptServices receiptServices = ReceiptServices();

  Future<List<Receipt>> getReceiptsRepository() async {
    List<dynamic> data = await receiptServices.fetchReceipts();
    return data.map((receipt) => Receipt.fromJson(receipt)).toList();
  }
}
