import 'dart:convert';

import 'package:mybarber/src/utils/env.dart';
import 'package:mybarber/src/utils/httpConf.dart';

class ServiceItemServices {
  final String endpoint = 'api/itemcategories';
  HttpMethod httpMethod = HttpMethod(baseUrl: HOST_API);

  Future<List<dynamic>> fetchItemCategory() async {
    final response = await httpMethod.get(endpoint);
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Fail to load items');
    }
  }
}
