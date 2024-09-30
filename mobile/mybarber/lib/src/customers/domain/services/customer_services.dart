import 'dart:convert';

import 'package:mybarber/src/customers/domain/models/customerVM_model.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:mybarber/src/utils/httpConf.dart';

class CustomerServices {
  final String endpoint = 'api/Customers';

  HttpMethod httpMethod = HttpMethod(baseUrl: HOST_API);

  Future<List<dynamic>> fetchCustomers() async {
    final response = await httpMethod.get(endpoint);
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Fail to load customers');
    }
  }

  Future<void> addCustomer(CustomerVM customerVM) async {
    final response = await httpMethod.post(endpoint, customerVM.toJson());
    if (response.statusCode != 201) {
      throw Exception('Fail to add customer');
    }
  }
}
