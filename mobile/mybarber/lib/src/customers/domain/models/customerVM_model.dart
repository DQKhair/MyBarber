class CustomerVM {
  final String customerName;
  final String customerPhone;
  final String customerAddress;

  CustomerVM(
      {required this.customerName,
      required this.customerAddress,
      required this.customerPhone});

  factory CustomerVM.fromJson(Map<String, dynamic> json) {
    return CustomerVM(
        customerName: json['customerName'],
        customerAddress: json['customerAddress'],
        customerPhone: json['customerPhone']);
  }

  Map<String, dynamic> toJson() {
    return {
      'customerName': customerName,
      'customerAddress': customerAddress,
      'customerPhone': customerPhone
    };
  }
}
