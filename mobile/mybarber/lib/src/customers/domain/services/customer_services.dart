import 'dart:convert';

import 'package:mybarber/src/customers/domain/models/customerVM_model.dart';
import 'package:mybarber/src/customers/domain/models/customer_model.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:http/http.dart' as http;

class CustomerServices {
  final String apiURL = '${HOST_API}/api/Customers';

  Future<List<dynamic>> fetchCustomers() async {
    final response = await http.get(
      Uri.parse(apiURL),
      headers: <String, String>{
        'Authorization': 'Bearer $TOKEN',
        'Content-Type': 'application/json',
      },
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Fail to load customers');
    }
  }

  Future<void> addCustomer(CustomerVM customerVM) async {
    final response = await http.post(Uri.parse(apiURL),
        headers: <String, String>{
          'Authorization': 'Bearer $TOKEN',
          'Content-Type': 'application/json',
        },
        body: jsonEncode(customerVM.toJson()));
    if (response.statusCode != 201) {
      throw Exception('Fail to add customer');
    }
  }
}
