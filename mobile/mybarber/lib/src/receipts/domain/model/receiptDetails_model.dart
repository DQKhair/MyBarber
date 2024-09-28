class ReceiptDetails {
  final String receiptDetail_ID;
  final int productQuantity;
  final double productPrice;
  final String productName;
  final String itemCategory_ID;
  final String receipt_ID;

  ReceiptDetails({
    required this.receiptDetail_ID,
    required this.productQuantity,
    required this.productPrice,
    required this.productName,
    required this.itemCategory_ID,
    required this.receipt_ID,
  });

  factory ReceiptDetails.fromJson(Map<String, dynamic> json) {
    return ReceiptDetails(
      receiptDetail_ID: json['receiptDetail_ID'],
      productQuantity: json['productQuantity'],
      productPrice: json['productPrice'].toDouble(),
      productName: json['productName'],
      itemCategory_ID: json['itemCategory_ID'],
      receipt_ID: json['receipt_ID'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'receiptDetail_ID': receiptDetail_ID,
      'productQuantity': productQuantity,
      'productPrice': productPrice,
      'productName': productName,
      'itemCategory_ID': itemCategory_ID,
      'receipt_ID': receipt_ID,
    };
  }
}
