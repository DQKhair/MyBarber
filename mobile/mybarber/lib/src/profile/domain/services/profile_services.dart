import 'dart:convert';

import 'package:mybarber/src/profile/domain/model/user_update_model.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:mybarber/src/utils/httpConf.dart';

class ProfileServices {
  final String endpoint = 'api/UserInfos';

  HttpMethod httpMethod = HttpMethod(baseUrl: HOST_API);

  Future<dynamic> fetchProfile(String userId) async {
    final response = await httpMethod.get('$endpoint/user/$userId');
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Fail to load profile');
    }
  }

  Future<void> updateUser(
      String userId, UserUpdateModel userUpdateModel) async {
    final response = await httpMethod.put(
        '$endpoint/updateEmployee/$userId', userUpdateModel.toJson());
    if (response.statusCode != 200) {
      throw Exception('Fail to update profile');
    }
  }
}
