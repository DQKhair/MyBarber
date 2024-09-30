import 'package:flutter/material.dart';
import 'package:mybarber/src/customers/domain/models/customer_model.dart';
import 'package:mybarber/src/utils/env.dart';

class CustomerDetail extends StatelessWidget {
  final Customer customer;
  const CustomerDetail({super.key, required this.customer});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Customer details',
          style: TextStyle(color: mainColor),
        ),
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
                        width: MediaQuery.of(context).size.width * 0.6,
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: Image.asset(
                            'assets/images/avataCustomer.jpg',
                            fit: BoxFit.contain,
                          ),
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
                      Expanded(
                        child: Text('ID: ${customer.customer_ID}'),
                      )
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
                      Expanded(child: Text("Name: ${customer.customerName}"))
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
                        Icons.phone_android_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Expanded(
                        child: Text('Phone: ${customer.customerPhone}'),
                      )
                    ],
                  ),
                  const SizedBox(
                    height: 26,
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.location_city_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Expanded(
                          child: Text("Address: ${customer.customerAddress}"))
                    ],
                  )
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
