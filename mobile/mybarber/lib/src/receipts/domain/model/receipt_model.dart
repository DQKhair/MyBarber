import 'package:mybarber/src/receipts/domain/model/receiptDetails_model.dart';

class Receipt {
  final String receipt_ID;
  final int totalQuantity;
  final double totalPrice;
  final DateTime receiptDate;
  final String status_ID;
  final String method_ID;
  final String employee_ID;
  final String? employee2_ID;
  final DateTime? employee2_Time;
  final String? employee3_ID;
  final DateTime? employee3_Time;
  final String customer_ID;
  final String statusName;
  final String methodName;
  final String employeeName;
  final String? employeeName2;
  final String? employeeName3;
  final String customerName;
  final List<ReceiptDetails> listReceiptDetailsVM;

  Receipt({
    required this.receipt_ID,
    required this.totalQuantity,
    required this.totalPrice,
    required this.receiptDate,
    required this.status_ID,
    required this.method_ID,
    required this.employee_ID,
    this.employee2_ID,
    this.employee2_Time,
    this.employee3_ID,
    this.employee3_Time,
    required this.customer_ID,
    required this.statusName,
    required this.methodName,
    required this.employeeName,
    this.employeeName2,
    this.employeeName3,
    required this.customerName,
    required this.listReceiptDetailsVM,
  });

  factory Receipt.fromJson(Map<String, dynamic> json) {
    return Receipt(
      receipt_ID: json['receipt_ID'],
      totalQuantity: json['totalQuantity'] ?? 0,
      totalPrice: json['totalPrice'].toDouble(),
      receiptDate: DateTime.parse(json['receiptDate']),
      status_ID: json['status_ID'],
      method_ID: json['method_ID'],
      employee_ID: json['employee_ID'],
      employee2_ID: json['employee2_ID'],
      employee2_Time: json['employee2_Time'] != null
          ? DateTime.parse(json['employee2_Time'])
          : null,
      employee3_ID: json['employee3_ID'],
      employee3_Time: json['employee3_Time'] != null
          ? DateTime.parse(json['employee3_Time'])
          : null,
      customer_ID: json['customer_ID'],
      statusName: json['statusName'],
      methodName: json['methodName'],
      employeeName: json['employeeName'],
      employeeName2: json['employeeName2'],
      employeeName3: json['employeeName3'],
      customerName: json['customerName'],
      listReceiptDetailsVM: (json['listReceiptDetailsVM'] as List)
          .map((e) => ReceiptDetails.fromJson(e))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'receipt_ID': receipt_ID,
      'totalQuantity': totalQuantity,
      'totalPrice': totalPrice,
      'receiptDate': receiptDate.toIso8601String(),
      'status_ID': status_ID,
      'method_ID': method_ID,
      'employee_ID': employee_ID,
      'employee2_ID': employee2_ID,
      'employee2_Time': employee2_Time?.toIso8601String(),
      'employee3_ID': employee3_ID,
      'employee3_Time': employee3_Time?.toIso8601String(),
      'customer_ID': customer_ID,
      'statusName': statusName,
      'methodName': methodName,
      'employeeName': employeeName,
      'employeeName2': employeeName2,
      'employeeName3': employeeName3,
      'customerName': customerName,
      'listReceiptDetailsVM': listReceiptDetailsVM.map((e) => e.toJson()).toList(),
    };
  }
}
