class LoginUser {
  final String email;
  final String password;

  LoginUser({required this.email, required this.password});

  factory LoginUser.fromJson(Map<String, dynamic> json) {
    return LoginUser(email: json['email'], password: json['password']);
  }

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'password': password,
    };
  }
}
