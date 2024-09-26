import 'package:flutter/material.dart';
import 'package:mybarber/src/servicesItem/domain/model/serviceItem.dart';
import 'package:mybarber/src/servicesItem/screens/serviceItem_detail.dart';
import 'package:mybarber/src/utils/env.dart';

void _navigateToServiceItemDetail(
    ServiceItem serviceItem, BuildContext context) {
  Navigator.push(
      context,
      MaterialPageRoute(
          builder: (context) => ServiceItemDetail(serviceItem: serviceItem)));
}

Widget ServiceItemWidget(ServiceItem serviceItem, BuildContext context) {
  return GestureDetector(
    onTap: () {
      _navigateToServiceItemDetail(serviceItem, context);
    },
    child: Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          children: [
            Container(
              height: 40.0,
              width: 40.0,
              alignment: Alignment.center,
              child: const Icon(
                Icons.insert_emoticon_outlined,
                color: mainColor,
              ),
            ),
            const SizedBox(width: 20.0),
            Expanded(
                child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "ServiceItem: ${serviceItem.serviceName}",
                  style: const TextStyle(
                      fontSize: 18, fontWeight: FontWeight.w500),
                ),
                const SizedBox(height: 4.0),
              ],
            )),
            // Row(
            //   mainAxisSize: MainAxisSize.min,
            //   mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            //   children: [
            //     IconButton(
            //       onPressed: () {},
            //       icon: const Icon(Icons.edit),
            //       color: Colors.yellow[700],
            //     ),
            //     IconButton(
            //       onPressed: () {},
            //       icon: const Icon(Icons.delete),
            //       color: Colors.red,
            //     )
            //   ],
            // )
          ],
        ),
      ),
    ),
  );
}
