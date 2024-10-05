import 'package:elegant_notification/elegant_notification.dart';
import 'package:elegant_notification/resources/arrays.dart';
import 'package:elegant_notification/resources/stacked_options.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:mybarber/main.dart';
import 'package:mybarber/src/login/widgets/formTitle_widget.dart';
import 'package:mybarber/src/products/domain/model/product_model.dart';
import 'package:mybarber/src/products/providers/product_provider.dart';
import 'package:mybarber/src/receipts/domain/model/receipt_create_model.dart';
import 'package:mybarber/src/receipts/providers/receipt_provider.dart';
import 'package:mybarber/src/servicesItem/domain/model/serviceItem.dart';
import 'package:mybarber/src/servicesItem/providers/serviceItem_provider.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ReceiptAdd extends StatefulWidget {
  const ReceiptAdd({Key? key}) : super(key: key);

  @override
  _ReceiptAddState createState() => _ReceiptAddState();
}

class _ReceiptAddState extends State<ReceiptAdd> {
  final NumberFormat currencyFormat =
      NumberFormat.currency(locale: 'vi_VN', symbol: 'đ');

  final _formKey = GlobalKey<FormState>();

  TextEditingController customerNameController = TextEditingController();
  TextEditingController customerPhoneController = TextEditingController();
  TextEditingController customerAddressController = TextEditingController();

  int serviceCount = 0;
  int productCount = 0;
  bool loading = false;

  List<TextEditingController> quantityProductsControllers = [];

  List<String?> selectedProducts = [];
  List<String?> selectedServices = [];

  List<Product> products = [];
  List<ServiceItem> services = [];

  List<Product?> selectedProductInfo = [];
  List<ServiceItem?> selectedServiceInfo = [];

  @override
  void initState() {
    super.initState();

    fetchProducts();
    fetchServices();
  }

  void fetchProducts() async {
    final provider = Provider.of<ProductProvider>(context, listen: false);
    await provider.loadProducts();
    setState(() {
      products = provider.products;
    });
  }

  void fetchServices() async {
    final provider = Provider.of<ServiceItemProvider>(context, listen: false);
    await provider.loadServicesItem();
    setState(() {
      services = provider.servicesItem;
    });
  }

  void onProductSelected(int index, String? productId) {
    setState(() {
      if (selectedProducts.length <= index) {
        selectedProducts.add(null);
        selectedProductInfo.add(null);
      }
      selectedProducts[index] = productId;
      selectedProductInfo[index] =
          products.firstWhere((product) => product.product_ID == productId);
    });
  }

  void onServiceSelected(int index, String? serviceId) {
    setState(() {
      if (selectedServices.length <= index) {
        selectedServices.add(null);
        selectedServiceInfo.add(null);
      }
      selectedServices[index] = serviceId;
      selectedServiceInfo[index] =
          services.firstWhere((service) => service.service_ID == serviceId);
    });
  }

  void onProductCountChanged(int? newValue) {
    setState(() {
      productCount = newValue ?? 0;

      if (quantityProductsControllers.length < productCount) {
        quantityProductsControllers.addAll(List.generate(
            productCount - quantityProductsControllers.length,
            (index) => TextEditingController()));
      } else if (quantityProductsControllers.length > productCount) {
        quantityProductsControllers =
            quantityProductsControllers.sublist(0, productCount);
      }

      if (selectedProducts.length > productCount) {
        selectedProducts = selectedProducts.sublist(0, productCount);
        selectedProductInfo = selectedProductInfo.sublist(0, productCount);

        quantityProductsControllers =
            quantityProductsControllers.sublist(0, productCount);
      } else {
        selectedProducts = List<String?>.filled(productCount, null);
        selectedProductInfo = List<Product?>.filled(productCount, null);
      }
    });
  }

  void onServiceCountChanged(int? newValue) {
    setState(() {
      serviceCount = newValue ?? 0;

      if (selectedServices.length > serviceCount) {
        selectedServices = selectedServices.sublist(0, serviceCount);
        selectedServiceInfo = selectedServiceInfo.sublist(0, serviceCount);
      } else {
        selectedServices = List<String?>.filled(serviceCount, null);
        selectedServiceInfo = List<ServiceItem?>.filled(serviceCount, null);
      }
    });
  }

  void handleSubmit() async {
    if (_formKey.currentState!.validate()) {
      // start loading
      setState(() {
        loading = true;
      });
      String customerName = customerNameController.text;
      String customerPhone = customerPhoneController.text;
      String customerAddress = customerAddressController.text;

      List<Product> productsInput =
          selectedProductInfo.whereType<Product>().toList();
      List<ServiceItem> servicesInput =
          selectedServiceInfo.whereType<ServiceItem>().toList();

      List<int> productsQuantityInput = [];

      for (int i = 0; i < productCount; i++) {
        if (quantityProductsControllers.length > i) {
          String? quantityText = quantityProductsControllers[i].text;
          int quantity = int.tryParse(quantityText ?? '') ?? 0;
          productsQuantityInput.add(quantity);
        }
      }

      ReceiptCreateModel receiptData = ReceiptCreateModel(
          customerName: customerName,
          customerPhone: customerPhone,
          customerAddress: customerAddress,
          productsInput: productsInput,
          productsQuantityInput: productsQuantityInput,
          servicesInput: servicesInput);
      final provider = Provider.of<ReceiptProvider>(context, listen: false);

      SharedPreferences pref = await SharedPreferences.getInstance();
      if (pref.getString('accessToken') != null &&
          pref.getString('accessToken') != '') {
        String token = pref.getString('accessToken')!;
        pref.getString('accessToken')!;
        Map<String, dynamic> decodedToken = JwtDecoder.decode(token);

        String userID = decodedToken['User_ID'] ?? '';

        bool result =
            await provider.createNewReceiptProvider(userID, receiptData);
        if (result) {
          navigatorKey.currentState?.pop();

          ElegantNotification.success(
            width: 260,
            isDismissable: false,
            stackedOptions: StackedOptions(
              key: 'top',
              type: StackedType.same,
              itemOffset: const Offset(-5, -5),
            ),
            title: const Text('Create'),
            description: const Text('Create successful!'),
            onDismiss: () {},
            onNotificationPressed: () {},
            border: const Border(
              bottom: BorderSide(
                color: Colors.green,
                width: 2,
              ),
            ),
          ).show(context);
        } else {
          ElegantNotification.error(
            width: 260,
            stackedOptions: StackedOptions(
              key: 'topRight',
              type: StackedType.below,
              itemOffset: const Offset(0, 5),
            ),
            position: Alignment.topRight,
            animation: AnimationType.fromRight,
            title: const Text('Create'),
            description: const Text('Create failed!'),
            onDismiss: () {},
          ).show(context);
        }
        // end loading
        setState(() {
          loading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: Center(
        child: ListView(
          children: [
            AppBar(
              title: const Text(
                'My barber',
                style: TextStyle(
                    color: mainColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 30),
              ),
              centerTitle: true,
            ),
            formTitle('Create new receipt', 'Please fill in your form'),
            const SizedBox(
              height: 20,
            ),
            Form(
              key: _formKey,
              child: Column(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 50),
                    child: TextFormField(
                      controller: customerNameController,
                      decoration: InputDecoration(
                          labelText: "Customer name",
                          prefixIcon: const Icon(Icons.person),
                          labelStyle: const TextStyle(
                              fontSize: 16, fontWeight: FontWeight.normal),
                          contentPadding: const EdgeInsets.symmetric(
                              vertical: 10, horizontal: 15),
                          isDense: true,
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)),
                          fillColor: Colors.white),
                      keyboardType: TextInputType.name,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Name is required';
                        }
                        return null;
                      },
                    ),
                  ),

                  const SizedBox(
                    height: 10,
                  ),

                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 50),
                    child: TextFormField(
                      controller: customerPhoneController,
                      decoration: InputDecoration(
                          labelText: "Phone number",
                          prefixIcon: const Icon(Icons.phone_android_outlined),
                          labelStyle: const TextStyle(
                              fontSize: 16, fontWeight: FontWeight.normal),
                          contentPadding: const EdgeInsets.symmetric(
                              vertical: 10, horizontal: 15),
                          isDense: true,
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)),
                          fillColor: Colors.white),
                      keyboardType: TextInputType.phone,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Phone is required';
                        }
                        if (!RegExp(
                                r'^\+?[0-9]{1,3}?[-. ]?(\(?\d{1,4}?\)?[-. ]?)?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$')
                            .hasMatch(value)) {
                          return 'Phone number invalid';
                        }
                        return null;
                      },
                    ),
                  ),

                  const SizedBox(
                    height: 10,
                  ),

                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 50),
                    child: TextFormField(
                      controller: customerAddressController,
                      decoration: InputDecoration(
                          labelText: "Address",
                          prefixIcon: const Icon(Icons.location_city_outlined),
                          labelStyle: const TextStyle(
                              fontSize: 16, fontWeight: FontWeight.normal),
                          contentPadding: const EdgeInsets.symmetric(
                              vertical: 10, horizontal: 15),
                          isDense: true,
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)),
                          fillColor: Colors.white),
                      keyboardType: TextInputType.streetAddress,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'address is required';
                        }
                        return null;
                      },
                    ),
                  ),

                  const SizedBox(
                    height: 10,
                  ),
                  const Divider(),

                  Container(
                      padding: const EdgeInsets.symmetric(horizontal: 50),
                      child: DropdownButton<int>(
                        value: serviceCount > 0 ? serviceCount : null,
                        hint: const Text('Quantity service'),
                        onChanged: (int? newValue) {
                          onServiceCountChanged(newValue);
                        },
                        items: List.generate(
                            6,
                            (index) => DropdownMenuItem<int>(
                                  value: index,
                                  child: Text('${index} (service)'),
                                )),
                      )),

                  const SizedBox(height: 16),
                  ...List.generate(serviceCount, (index) {
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 8.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          DropdownButton<String>(
                            value: selectedServices.length > index
                                ? selectedServices[index]
                                : null,
                            hint: const Text('Select service'),
                            onChanged: (value) =>
                                onServiceSelected(index, value),
                            items: services.map((service) {
                              return DropdownMenuItem<String>(
                                value: service.service_ID,
                                child: Text(service.serviceName),
                              );
                            }).toList(),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          if (selectedServiceInfo.length > index &&
                              selectedServiceInfo[index] != null) ...[
                            Text(
                              'Price: ${currencyFormat.format(selectedServiceInfo[index]!.servicePrice)}',
                              style: const TextStyle(color: Colors.red),
                            ),
                            Text(
                                'Description: ${selectedServiceInfo[index]!.serviceDescription}'),
                          ],
                          const SizedBox(
                            height: 10,
                          ),
                        ],
                      ),
                    );
                  }),

                  const SizedBox(
                    height: 10,
                  ),
                  const Divider(),

                  Container(
                      padding: const EdgeInsets.symmetric(horizontal: 50),
                      child: DropdownButton<int>(
                        value: productCount > 0 ? productCount : null,
                        hint: const Text('Quantity Product'),
                        onChanged: (int? newValue) {
                          onProductCountChanged(newValue);
                        },
                        items: List.generate(
                            6,
                            (index) => DropdownMenuItem<int>(
                                  value: index,
                                  child: Text('${index} (product)'),
                                )),
                      )),

                  const SizedBox(height: 16),
                  ...List.generate(productCount, (index) {
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 8.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              DropdownButton<String>(
                                value: selectedProducts.length > index
                                    ? selectedProducts[index]
                                    : null,
                                hint: const Text('Select product'),
                                onChanged: (value) =>
                                    onProductSelected(index, value),
                                items: products.map((product) {
                                  return DropdownMenuItem<String>(
                                    value: product.product_ID,
                                    child: Text(product.productName),
                                  );
                                }).toList(),
                              ),
                              const SizedBox(
                                width: 16,
                              ),
                              Container(
                                width: 100,
                                child: TextFormField(
                                  controller: quantityProductsControllers[
                                      index], // Use the controller directly
                                  decoration: InputDecoration(
                                    labelText: 'Quantity ${index + 1}',
                                    border: const OutlineInputBorder(),
                                  ),
                                  keyboardType: TextInputType
                                      .number, // Ensure it's numeric input
                                  validator: (value) {
                                    if (value == null || value.isEmpty) {
                                      return 'Quantity product is required';
                                    }
                                    if (int.tryParse(value) == null) {
                                      return 'Quantity product invalid';
                                    }
                                    return null;
                                  },
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(
                            height: 16,
                          ),
                          if (selectedProductInfo.length > index &&
                              selectedProductInfo[index] != null) ...[
                            Text(
                              'Price: ${currencyFormat.format(selectedProductInfo[index]!.productPrice)}',
                              style: const TextStyle(color: Colors.red),
                            ),
                            Text(
                                'Description: ${selectedProductInfo[index]!.productDescription}'),
                          ],
                          const SizedBox(
                            height: 16,
                          ),
                        ],
                      ),
                    );
                  }),

                  const SizedBox(
                    height: 10,
                  ),
                  // submit button
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 50, vertical: 10),
                    child: ElevatedButton(
                      onPressed: loading ? null : handleSubmit,
                      style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          backgroundColor: Colors.green,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10))),
                      child: loading
                          ? const CircularProgressIndicator()
                          : const Text(
                              ' Create ',
                              style: TextStyle(fontSize: 18),
                            ),
                    ),
                  ),
                  // other login title
                  const SizedBox(
                    height: 20,
                  ),
                ],
              ),
            )
          ],
        ),
      )),
    );
  }
}
