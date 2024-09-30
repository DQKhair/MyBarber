import 'dart:convert';

import 'package:mybarber/src/login/domain/model/login_model.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:http/http.dart' as http;

class LoginServices {
  final String apiURL = '${HOST_API}/api/Authentication/Login';

  Future<dynamic> loginUser(LoginUser loginUser) async {
    final response = await http.post(
      Uri.parse(apiURL),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(loginUser.toJson())
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else if (response.statusCode == 400) {
      throw Exception('email or password incorrect!');
    } else {
      throw Exception('Fail to login');
    }
  }
}
