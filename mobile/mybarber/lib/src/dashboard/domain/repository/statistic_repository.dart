import 'package:mybarber/src/dashboard/domain/model/statistic_model.dart';
import 'package:mybarber/src/dashboard/domain/services/statistic_services.dart';

class StatisticRepository {
  StatisticServices statisticServices = StatisticServices();

  Future<List<StatisticModel>> getStatisticRepository() async {
    List<dynamic> data =
        await statisticServices.fetchStatisticReceiptMoneyDaily();
    return data.map((statistic) => StatisticModel.fromJson(statistic)).toList();
  }
}
