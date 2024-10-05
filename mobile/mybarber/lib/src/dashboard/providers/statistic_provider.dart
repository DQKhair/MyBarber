import 'package:flutter/material.dart';
import 'package:mybarber/src/dashboard/domain/model/statistic_model.dart';
import 'package:mybarber/src/dashboard/domain/repository/statistic_repository.dart';

class StatisticProvider with ChangeNotifier {
  List<StatisticModel> _statisticData = [];

  final StatisticRepository statisticRepository = StatisticRepository();

  List<StatisticModel> get statisticData => _statisticData;

  Future<void> loadStatistic() async {
    try {
      _statisticData = await statisticRepository.getStatisticRepository();
      notifyListeners();
    } catch (error) {
      print('Error loading statistic: $error');
      throw Exception(error);
    }
  }
}
