import 'package:flutter/material.dart';
import 'package:mybarber/src/servicesItem/domain/model/serviceItem.dart';
import 'package:mybarber/src/servicesItem/domain/repository/serviceItem_repository.dart';

class ServiceItemProvider with ChangeNotifier {
  List<ServiceItem> _servicesItem = [];
  final ServiceItemRepository _serviceItemRepository = ServiceItemRepository();

  List<ServiceItem> get servicesItem => _servicesItem;

  Future<void> loadServicesItem() async {
    try {
      _servicesItem = await _serviceItemRepository.getServicesRepository();
      notifyListeners();
    } catch (error) {
      print('Error loading items: $error');
      throw Exception(error);
    }
  }
}
