import 'package:flutter/material.dart';
import 'package:mybarber/src/customers/domain/models/customerVM_model.dart';
import 'package:mybarber/src/customers/domain/models/customer_model.dart';
import 'package:mybarber/src/customers/domain/repository/customer_repository.dart';

class CustomerProvider with ChangeNotifier {
  List<Customer> _customers = [];
  final CustomerRepository _customerRepository = CustomerRepository();

  List<Customer> get customers => _customers;

  Future<void> loadCustomers() async {
    try {
      _customers = await _customerRepository.getCustomersRepository();
      notifyListeners();
    } catch (error) {
      print('Error loading customers: $error');
      throw Exception(error);
    }
  }

  Future<bool> addCustomerProvider(CustomerVM customerVM) async {
    try {
      await _customerRepository.addCustomerRepository(customerVM);
      await loadCustomers();
      return true;
    } catch (error) {
      print('Error adding new customer: $error');
      return false;
    }
  }
}
