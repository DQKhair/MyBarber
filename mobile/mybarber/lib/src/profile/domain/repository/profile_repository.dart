import 'package:mybarber/src/profile/domain/model/user_model.dart';
import 'package:mybarber/src/profile/domain/model/user_update_model.dart';
import 'package:mybarber/src/profile/domain/services/profile_services.dart';

class ProfileRepository {
  final ProfileServices profileServices = ProfileServices();

  Future<UserModel> getProfileRepository(String userId) async {
    Map<String, dynamic> data = await profileServices.fetchProfile(userId);
    return UserModel.fromJson(data);
  }

  Future<void> updateProfileRepository(
      String userId, UserUpdateModel userUpdateModel) async {
    await profileServices.updateUser(userId, userUpdateModel);
  }
}
