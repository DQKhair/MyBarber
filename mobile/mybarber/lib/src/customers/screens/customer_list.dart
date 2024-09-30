import 'package:flutter/material.dart';
import 'package:mybarber/src/customers/providers/customer_provider.dart';
import 'package:mybarber/src/customers/screens/AddNewCustomer.dart';
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
        title: const Text('Customers',style: TextStyle(color: mainColor),),
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
        tooltip: "Add new customer",
        onPressed: () {
          _navigateAddNewCustomer(context);
        },
        shape: const CircleBorder(),
        backgroundColor: Colors.green[400],
        child: const Icon(
          Icons.add,
          color: Colors.white,
        ),
      ),
    );
  }
}

void _navigateAddNewCustomer(BuildContext context) {
  Navigator.push(
      context, MaterialPageRoute(builder: (context) => AddNewCustomer()));
}
