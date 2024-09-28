import 'package:flutter/material.dart';
import 'package:mybarber/src/receipts/domain/model/receiptDetails_model.dart';
import 'package:mybarber/src/receipts/domain/model/receipt_model.dart';
import 'package:mybarber/src/receipts/widgets/listReceiptDetail_widget.dart';
import 'package:mybarber/src/utils/env.dart';

class ReceiptDetail extends StatelessWidget {
  final Receipt receipt;
  const ReceiptDetail({super.key, required this.receipt});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Receipt details'),
      ),
      body: SingleChildScrollView(
        child: Container(
          padding: const EdgeInsets.all(36),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      SizedBox(
                        width: 300,
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: Image.asset('assets/images/avataCustomer.jpg'),
                        ),
                      )
                    ],
                  ),
                  const SizedBox(
                    height: 36,
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.key_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Text('Receipt ID: ${receipt.receipt_ID}'),
                    ],
                  ),
                  const SizedBox(
                    height: 16,
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.tag,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Text("Customer: ${receipt.customerName}")
                    ],
                  )
                ],
              ),
              const SizedBox(height: 26),
              Column(
                children: [
                  Row(
                    children: [
                      const Icon(
                        Icons.date_range_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Text('Date: ${receipt.receiptDate}'),
                    ],
                  ),
                  const SizedBox(
                    height: 26,
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.numbers_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Text("Total quantity: ${receipt.totalQuantity}")
                    ],
                  )
                ],
              ),
              const SizedBox(height: 26),
              Column(
                children: [
                  Row(
                    children: [
                      const Icon(
                        Icons.price_change_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Text('Total price: ${receipt.totalPrice}'),
                    ],
                  ),
                  const SizedBox(
                    height: 26,
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.linear_scale_rounded,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Text("Status: ${receipt.statusName}")
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 26),
              Column(
                children: [
                  Row(
                    children: [
                      const Icon(
                        Icons.phone_android_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Text('Payment: ${receipt.methodName}'),
                    ],
                  ),
                  const SizedBox(
                    height: 26,
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.person_pin_circle_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Text("Employee create receipt: ${receipt.employeeName}")
                    ],
                  )
                ],
              ),
              const SizedBox(height: 26),
              Column(
                children: [
                  Row(
                    children: [
                      const Icon(
                        Icons.person_pin_circle_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Text('Employee 02: ${receipt.employeeName2 ?? ''}'),
                    ],
                  ),
                  const SizedBox(
                    height: 26,
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.watch_later_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Text("Time: ${receipt.employee2_Time ?? ''}")
                    ],
                  )
                ],
              ),
              const SizedBox(height: 26),
              Column(
                children: [
                  Row(
                    children: [
                      const Icon(
                        Icons.person_pin_circle_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Text('Employee 03: ${receipt.employeeName3 ?? ''}'),
                    ],
                  ),
                  const SizedBox(
                    height: 26,
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.watch_later_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Text("Time: ${receipt.employee3_ID ?? ''}")
                    ],
                  ),
                  const Divider(),
                  listReceiptDetail(receipt),
                  const SizedBox(
                    height: 30,
                  )
                ],
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        shape: const CircleBorder(),
        backgroundColor: Colors.yellow[700],
        child: const Icon(
          Icons.edit,
          color: Colors.white,
        ),
      ),
    );
  }
}
