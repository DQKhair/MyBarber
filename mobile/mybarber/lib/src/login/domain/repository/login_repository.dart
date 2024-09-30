import 'package:mybarber/src/login/domain/model/APIRes_model.dart';
import 'package:mybarber/src/login/domain/model/login_model.dart';
import 'package:mybarber/src/login/domain/services/login_services.dart';

class LoginRepository {
  final LoginServices loginServices = LoginServices();

  Future<ApiRes> loginUserRepository(LoginUser loginUser) async {
    final data = await loginServices.loginUser(loginUser);
    return ApiRes.fromJson(data);
  }

}