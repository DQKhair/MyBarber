import 'package:flutter/material.dart';
import 'package:mybarber/src/servicesItem/providers/serviceItem_provider.dart';
import 'package:mybarber/src/servicesItem/widgets/serviceItem_widget.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:provider/provider.dart';

class ServiceItemList extends StatefulWidget {
  const ServiceItemList({Key? key}) : super(key: key);

  @override
  _ServiceItemListState createState() => _ServiceItemListState();
}

class _ServiceItemListState extends State<ServiceItemList> {
  late Future<void> _loadServicesFuture;

  @override
  void initState() {
    super.initState();
    final provider = Provider.of<ServiceItemProvider>(context, listen: false);
    _loadServicesFuture = provider.loadServicesItem();
    
  }

  @override
  Widget build(BuildContext context) {
    final servicesItemProvider = Provider.of<ServiceItemProvider>(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Services',style: TextStyle(color: mainColor),),
      ),
      body: FutureBuilder(
          future: _loadServicesFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            } else if (snapshot.hasError) {
              return Center(
                child: Text('Error: ${snapshot.error}'),
              );
            } else {
              return ListView.builder(
                itemCount: servicesItemProvider.products.length,
                itemBuilder: (context, index) {
                  return ServiceItemWidget(
                      servicesItemProvider.products[index], context);
                },
              );
            }
          }),
    );
  }
}
