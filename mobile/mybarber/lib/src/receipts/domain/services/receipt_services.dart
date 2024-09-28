import 'dart:convert';

import 'package:mybarber/src/utils/env.dart';
import 'package:http/http.dart' as http;

class ReceiptServices {
  final String apiURL = '${HOST_API}/api/Receipts';

  Future<List<dynamic>> fetchReceipts() async {
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
      throw Exception('Fail to load receipts');
    }
  }
}
