import 'package:flutter/material.dart';
import 'package:mybarber/src/profile/domain/model/user_model.dart';
import 'package:mybarber/src/profile/domain/model/user_update_model.dart';
import 'package:mybarber/src/profile/domain/repository/profile_repository.dart';

class ProfileProvider with ChangeNotifier {
  final ProfileRepository profileRepository = ProfileRepository();
  UserModel? _userModel;

  UserModel? get userModel => _userModel;

  Future<void> loadProfile(String userId) async {
    try {
      _userModel = await profileRepository.getProfileRepository(userId);
      notifyListeners();
    } catch (err) {
      print('Error loading profile: $err');
      throw Exception(err);
    }
  }

  Future<bool> updateProfileProvider(
      String userId, UserUpdateModel userUpdateModel) async {
    try {
      await profileRepository.updateProfileRepository(userId, userUpdateModel);
      await loadProfile(userId);
      return true;
    } catch (err) {
      print('Error update profile: $err');
      return false;
    }
  }
}
