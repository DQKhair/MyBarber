import 'dart:convert';

import 'package:mybarber/src/utils/env.dart';
import 'package:mybarber/src/utils/httpConf.dart';

class StatisticServices {
  final String endpoint = 'api/Statistics/receipt_money/datetime=daily';
  HttpMethod httpMethod = HttpMethod(baseUrl: HOST_API);

  Future<List<dynamic>> fetchStatisticReceiptMoneyDaily() async {
    final response = await httpMethod.get(endpoint);
      print('statuscode: $response.statusCode');
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Fail to load statistic receipt money daily');
    }
  }
}
