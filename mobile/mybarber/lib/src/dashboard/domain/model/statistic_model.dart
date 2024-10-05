class StatisticModel {
  final int data;
  final String dateTime;
  final String timeResponse;

  StatisticModel(
      {required this.data, required this.dateTime, required this.timeResponse});

  factory StatisticModel.fromJson(Map<String, dynamic> json) {
    return StatisticModel(
      data: json['data'],
      dateTime: json['dateTime'],
      timeResponse: json['timeResponse'],
    );
  }

  Map<String, dynamic> toJson() {
    return {'data': data, 'dateTime': dateTime, 'timeResponse': timeResponse};
  }
}
