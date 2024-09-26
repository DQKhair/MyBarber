import 'package:flutter/material.dart';
import 'package:mybarber/src/servicesItem/domain/model/serviceItem.dart';
import 'package:mybarber/src/utils/env.dart';

class ServiceItemDetail extends StatelessWidget {
  final ServiceItem serviceItem;
  const ServiceItemDetail({super.key, required this.serviceItem});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Service details'),
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
                          child: Image.network('${HOST_API}/${serviceItem.serviceImage}'),
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
                      Text('ID: ${serviceItem.service_ID}'),
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
                      Text("Name: ${serviceItem.serviceName}")
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
                      Text('Price: ${serviceItem.servicePrice}'),
                    ],
                  ),
                  const SizedBox(
                    height: 26,
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.description_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Text("Description: ${serviceItem.serviceDescription}")
                    ],
                  ),
                   const SizedBox(
                    height: 26,
                  ),
                  Row(
                    children: [
                      const Icon(
                        Icons.description_outlined,
                        color: mainColor,
                      ),
                      const SizedBox(
                        width: 16,
                      ),
                      Text("Category ID: ${serviceItem.category_ID}")
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
