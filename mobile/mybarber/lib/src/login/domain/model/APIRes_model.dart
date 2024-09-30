class ApiRes {
  final bool success;
  final String message;
  final String? accessToken;
  final String? refreshToken;

  ApiRes(
      {required this.success,
      required this.message,
      required this.accessToken,
      required this.refreshToken});

  factory ApiRes.fromJson(Map<String, dynamic> json) {
    return ApiRes(
      success: json['success'],
      message: json['message'],
      accessToken: json['accessToken'],
      refreshToken: json['refreshToken'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'success': success,
      'message': message,
      'accessToken': accessToken,
      'refreshToken': refreshToken,
    };
  }
}
