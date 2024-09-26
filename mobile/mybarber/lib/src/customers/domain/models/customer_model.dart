class Customer {
  final String customer_ID;
  final String customerName;
  final String customerPhone;
  final String customerAddress;

  Customer(
      {required this.customer_ID,
      required this.customerName,
      required this.customerAddress,
      required this.customerPhone});

  factory Customer.fromJson(Map<String, dynamic> json) {
    return Customer(
        customer_ID: json['customer_ID'],
        customerName: json['customerName'],
        customerAddress: json['customerAddress'],
        customerPhone: json['customerPhone']);
  }

  Map<String,dynamic> toJson() {
    return {
      'customer_ID': customer_ID,
      'customerName': customerName,
      'customerAddress': customerAddress,
      'customerPhone': customerPhone
    };
  }
}
