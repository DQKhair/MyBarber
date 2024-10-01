class UserUpdateModel {
  final String userName;
  final String userAddress;
  final String userPhone;
  final String userEmail;
  final String userPassword;

  UserUpdateModel(
      {required this.userName,
      required this.userAddress,
      required this.userPhone,
      required this.userEmail,
      required this.userPassword});

  factory UserUpdateModel.fromJson(Map<String, dynamic> json) {
    return UserUpdateModel(
        userName: json['userName'],
        userAddress: json['userAddress'],
        userPhone: json['userPhone'],
        userEmail: json['userEmail'],
        userPassword: json['userPassword']);
  }

  Map<String, dynamic> toJson() {
    return {
      'userName': userName,
      'userAddress': userAddress,
      'userPhone': userPhone,
      'userEmail': userEmail,
      'userPassword': userPassword
    };
  }
}
