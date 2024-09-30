import 'package:flutter/material.dart';
import 'package:mybarber/src/login/domain/model/APIRes_model.dart';
import 'package:mybarber/src/login/domain/model/login_model.dart';
import 'package:mybarber/src/login/domain/repository/login_repository.dart';

class LoginProvider with ChangeNotifier {
  final LoginRepository loginRepository = LoginRepository();

  Future<ApiRes> loginUserProvider(LoginUser loginUser) async {
    try {
      ApiRes apiRes = await loginRepository.loginUserRepository(loginUser);
      return apiRes;
    } catch (error) {
      print('Error loading customers: $error');
      return ApiRes(
          success: false,
          message: error.toString(),
          accessToken: '',
          refreshToken: '');
    }
  }
}
