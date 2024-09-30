import 'dart:convert';

import 'package:mybarber/src/utils/env.dart';
import 'package:mybarber/src/utils/httpConf.dart';

class ReceiptServices {
  final String endpoint = 'api/Receipts';

  HttpMethod httpMethod = HttpMethod(baseUrl: HOST_API);

  Future<List<dynamic>> fetchReceipts() async {
    final response = await httpMethod.get(endpoint);
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Fail to load receipts');
    }
  }
}
