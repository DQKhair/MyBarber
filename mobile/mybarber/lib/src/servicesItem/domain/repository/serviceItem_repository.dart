import 'package:mybarber/src/servicesItem/domain/model/serviceItem.dart';
import 'package:mybarber/src/servicesItem/domain/services/serviceItem_services.dart';

class ServiceItemRepository {
  final ServiceItemServices serviceItemServices = ServiceItemServices();

  Future<List<ServiceItem>> getServicesRepository() async {
    List<dynamic> data = await serviceItemServices.fetchItemCategory();
    return data
        .map((service) => ServiceItem.fromJson(service))
        .where((service) => service.category_ID == 1)
        .toList();
  }
}
