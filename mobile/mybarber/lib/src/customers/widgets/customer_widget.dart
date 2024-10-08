import 'package:flutter/material.dart';
import 'package:mybarber/src/customers/domain/models/customer_model.dart';
import 'package:mybarber/src/customers/screens/customer_detail.dart';
import 'package:mybarber/src/utils/env.dart';

void _navigateToCustomerDetail(Customer customer, BuildContext context) {
  Navigator.push(
      context,
      MaterialPageRoute(
          builder: (context) => CustomerDetail(customer: customer)));
}

Widget customerWidget(Customer customer, BuildContext context) {
  return GestureDetector(
    onTap: () {
      _navigateToCustomerDetail(customer, context);
    },
    child: Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      elevation: 8,
      child: Container(
        decoration: BoxDecoration(
          gradient: const LinearGradient(
              colors: [Colors.white, mainColor],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight),
          borderRadius: BorderRadius.circular(15),
        ),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              Container(
                height: 40.0,
                width: 40.0,
                alignment: Alignment.center,
                child: const Icon(
                  Icons.person_2_outlined,
                  color: mainColor,
                ),
              ),
              const SizedBox(width: 20.0),
              Expanded(
                  child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "${customer.customerName} ",
                    style: const TextStyle(
                        fontSize: 18, fontWeight: FontWeight.w500),
                  ),
                  const SizedBox(height: 4.0),
                ],
              )),
            ],
          ),
        ),
      ),
    ),
  );
}
