import 'package:mybarber/src/customers/domain/models/customer_model.dart';
import 'package:mybarber/src/customers/domain/services/customer_services.dart';

class CustomerRepository {
  final CustomerServices customerServices = CustomerServices();

  Future<List<Customer>> getCustomersRepository() async {
    List<dynamic> data = await customerServices.fetchCustomers();
    return data.map((customer) => Customer.fromJson(customer)).toList();
  }

  Future<Customer> getCustomerByIdRepository(String customerId) async {
    return await customerServices.getCustomerById(customerId);
  }

  Future<void> addCustomerRepository(Customer customer) async {
    await customerServices.addCustomer(customer);
  }

}
