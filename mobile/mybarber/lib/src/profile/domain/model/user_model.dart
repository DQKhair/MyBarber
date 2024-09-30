class UserModel {
  final String user_ID;
  final String userName;
  final String userAddress;
  final String userPhone;
  final String userEmail;
  final String userPassword;

  UserModel(
      {required this.user_ID,
      required this.userName,
      required this.userAddress,
      required this.userPhone,
      required this.userEmail,
      required this.userPassword});

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
        user_ID: json['user_ID'],
        userName: json['userName'],
        userAddress: json['userAddress'],
        userPhone: json['userPhone'],
        userEmail: json['userEmail'],
        userPassword: json['userPassword']);
  }

  Map<String, dynamic> toJson() {
    return {
      'user_ID': user_ID,
      'userName': userName,
      'userAddress': userAddress,
      'userPhone': userPhone,
      'userEmail': userEmail,
      'userPassword': userPassword
    };
  }
}
