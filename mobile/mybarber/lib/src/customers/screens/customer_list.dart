import 'package:flutter/material.dart';
import 'package:mybarber/src/customers/providers/customer_provider.dart';
import 'package:mybarber/src/customers/widgets/customer_widget.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:provider/provider.dart';

class CustomerList extends StatefulWidget {
  const CustomerList({Key? key}) : super(key: key);

  @override
  _CustomerListState createState() => _CustomerListState();
}

class _CustomerListState extends State<CustomerList> {
  late Future<void> _loadCustomerFuture;

  @override
  void initState() {
    super.initState();
    final provider = Provider.of<CustomerProvider>(context, listen: false);
    _loadCustomerFuture = provider.loadCustomers();
  }

  @override
  Widget build(BuildContext context) {
    final customersProvider = Provider.of<CustomerProvider>(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Customers'),
      ),
      body: FutureBuilder(
          future: _loadCustomerFuture,
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
                itemCount: customersProvider.customers.length,
                itemBuilder: (context, index) {
                  return customerWidget(
                      customersProvider.customers[index], context);
                },
              );
            }
          }),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        shape: const CircleBorder(),
        backgroundColor: mainColor,
        child: const Icon(
          Icons.add,
          color: Colors.white,
        ),
      ),
    );
  }
}
