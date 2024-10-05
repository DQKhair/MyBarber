import 'package:elegant_notification/elegant_notification.dart';
import 'package:elegant_notification/resources/arrays.dart';
import 'package:elegant_notification/resources/stacked_options.dart';
import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:mybarber/main.dart';
import 'package:mybarber/src/login/widgets/formTitle_widget.dart';
import 'package:mybarber/src/receipts/domain/model/receipt_model.dart';
import 'package:mybarber/src/receipts/providers/receipt_provider.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ReceiptModify extends StatefulWidget {
  final Receipt receipt;
  const ReceiptModify({super.key, required this.receipt});

  @override
  _ReceiptModifyState createState() => _ReceiptModifyState();
}

class _ReceiptModifyState extends State<ReceiptModify> {
  final List<String> _statusName = [
    'Waiting for a haircut',
    'Waiting for a hair wash',
    'Confirm finished',
    'Payment completed'
  ];
  final List<String> _methodName = ['Cash payment', 'Online payment'];
  final _formKey = GlobalKey<FormState>();

  TextEditingController receiptIdController = TextEditingController();
  TextEditingController statusNameController = TextEditingController();
  TextEditingController customerNameController = TextEditingController();
  TextEditingController receiptTotalPriceController = TextEditingController();
  TextEditingController receiptTotalQuantityController =
      TextEditingController();

  String? selectedStatus;
  String? selectedMethod;
  bool isCompleted = false;
  bool loading = false;

  @override
  void initState() {
    super.initState();
    receiptIdController =
        TextEditingController(text: widget.receipt.receipt_ID);
    statusNameController =
        TextEditingController(text: widget.receipt.statusName);
    customerNameController =
        TextEditingController(text: widget.receipt.customerName);
    receiptTotalPriceController =
        TextEditingController(text: widget.receipt.totalPrice.toString());
    receiptTotalQuantityController =
        TextEditingController(text: widget.receipt.totalQuantity.toString());
  }

  void handleSubmit() async {
    final provider = Provider.of<ReceiptProvider>(context, listen: false);
    if (_formKey.currentState!.validate()) {
      //start loading
      setState(() {
        loading = true;
      });
      String _receiptId = receiptIdController.text;

      SharedPreferences pref = await SharedPreferences.getInstance();
      if (pref.getString('accessToken') != null &&
          pref.getString('accessToken') != '') {
        String token = pref.getString('accessToken')!;
        pref.getString('accessToken')!;
        Map<String, dynamic> decodedToken = JwtDecoder.decode(token);

        String userID = decodedToken['User_ID'] ?? '';

        if (selectedStatus == 'Waiting for a haircut') {
          bool result =
              await provider.confirmHaircutProvider(_receiptId, userID);

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
              title: const Text('Update'),
              description: const Text('Update successful!'),
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
              title: const Text('Update'),
              description: const Text('Update failed!'),
              onDismiss: () {},
            ).show(context);
          }
        }
        if (selectedStatus == 'Waiting for a hair wash') {
          bool result =
              await provider.confirmHairWashProvider(_receiptId, userID);
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
              title: const Text('Update'),
              description: const Text('Update successful!'),
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
              title: const Text('Update'),
              description: const Text('Update failed!'),
              onDismiss: () {},
            ).show(context);
          }
        }
        if (selectedStatus == 'Confirm finished') {
          bool result = await provider.confirmFinishedProvider(_receiptId);
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
              title: const Text('Update'),
              description: const Text('Update successful!'),
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
              title: const Text('Update'),
              description: const Text('Update failed!'),
              onDismiss: () {},
            ).show(context);
          }
        }
        if (selectedStatus == 'Payment completed') {
          bool result = await provider.confirmPaymentCompletedProvider(
              _receiptId, selectedMethod!);
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
              title: const Text('Update'),
              description: const Text('Update successful!'),
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
              title: const Text('Update'),
              description: const Text('Update failed!'),
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
  }

  @override
  void dispose() {
    receiptIdController.dispose();
    customerNameController.dispose();
    receiptTotalPriceController.dispose();
    receiptTotalQuantityController.dispose();
    super.dispose();
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
                  color: mainColor, fontWeight: FontWeight.bold, fontSize: 30),
            ),
            centerTitle: true,
          ),
          formTitle('Update receipt', 'Please fill in your form'),
          const SizedBox(
            height: 20,
          ),
          Form(
              key: _formKey,
              child: Column(
                children: [
                  const SizedBox(
                    height: 20,
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 50),
                    child: TextFormField(
                      enabled: false,
                      controller: receiptIdController,
                      decoration: InputDecoration(
                          labelText: "Receipt ID",
                          prefixIcon: const Icon(Icons.key_outlined),
                          labelStyle: const TextStyle(
                              fontSize: 16, fontWeight: FontWeight.normal),
                          contentPadding: const EdgeInsets.symmetric(
                              vertical: 10, horizontal: 15),
                          isDense: true,
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)),
                          fillColor: Colors.white),
                      keyboardType: TextInputType.text,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'ID is required';
                        }
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 50),
                    child: TextFormField(
                      enabled: false,
                      controller: customerNameController,
                      decoration: InputDecoration(
                          labelText: "Customer",
                          prefixIcon: const Icon(Icons.person_2_outlined),
                          labelStyle: const TextStyle(
                              fontSize: 16, fontWeight: FontWeight.normal),
                          contentPadding: const EdgeInsets.symmetric(
                              vertical: 10, horizontal: 15),
                          isDense: true,
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)),
                          fillColor: Colors.white),
                      keyboardType: TextInputType.text,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Customer is required';
                        }
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 50),
                    child: TextFormField(
                      enabled: false,
                      controller: statusNameController,
                      decoration: InputDecoration(
                          labelText: "Status",
                          prefixIcon: const Icon(Icons.linear_scale_rounded),
                          labelStyle: const TextStyle(
                              fontSize: 16, fontWeight: FontWeight.normal),
                          contentPadding: const EdgeInsets.symmetric(
                              vertical: 10, horizontal: 15),
                          isDense: true,
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)),
                          fillColor: Colors.white),
                      keyboardType: TextInputType.text,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Status is required';
                        }
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 50),
                    child: TextFormField(
                      enabled: false,
                      controller: receiptTotalPriceController,
                      decoration: InputDecoration(
                          labelText: "Total price",
                          prefixIcon: const Icon(Icons.price_change_outlined),
                          labelStyle: const TextStyle(
                              fontSize: 16, fontWeight: FontWeight.normal),
                          contentPadding: const EdgeInsets.symmetric(
                              vertical: 10, horizontal: 15),
                          isDense: true,
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)),
                          fillColor: Colors.white),
                      keyboardType: TextInputType.number,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Price is required';
                        }
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 50),
                    child: TextFormField(
                      enabled: false,
                      controller: receiptTotalQuantityController,
                      decoration: InputDecoration(
                          labelText: "Total quantity product",
                          prefixIcon: const Icon(Icons.numbers_outlined),
                          labelStyle: const TextStyle(
                              fontSize: 16, fontWeight: FontWeight.normal),
                          contentPadding: const EdgeInsets.symmetric(
                              vertical: 10, horizontal: 15),
                          isDense: true,
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)),
                          fillColor: Colors.white),
                      keyboardType: TextInputType.text,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Quantity is required';
                        }
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.8,
                    child: DropdownButtonFormField(
                      hint: const Text("Select status"),
                      value: selectedStatus,
                      items: _statusName.map((String value) {
                        return DropdownMenuItem<String>(
                            value: value, child: Text(value));
                      }).toList(),
                      onChanged: (String? newValue) {
                        setState(() {
                          selectedStatus = newValue;
                          if (newValue == 'Payment completed') {
                            isCompleted = true;
                          } else {
                            isCompleted = false;
                          }
                        });
                      },
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Status is required';
                        }
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.8,
                    child: DropdownButtonFormField(
                      hint: const Text("Select methods"),
                      value: selectedMethod,
                      items: _methodName.map((String value) {
                        return DropdownMenuItem<String>(
                            value: value, child: Text(value));
                      }).toList(),
                      onChanged: !isCompleted
                          ? null
                          : (String? newValue) {
                              setState(() {
                                selectedMethod = newValue;
                              });
                            },
                      validator: (value) {
                        if ((value == null || value.isEmpty) && isCompleted) {
                          return 'Method is required';
                        }
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 50, vertical: 10),
                    child: ElevatedButton(
                      onPressed: loading ? null : handleSubmit,
                      style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(
                              vertical: 10, horizontal: 10),
                          backgroundColor: mainColor,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10))),
                      child: loading
                          ? const CircularProgressIndicator(
                              color: Colors.white,
                            )
                          : const Text(
                              'Update',
                              style: TextStyle(fontSize: 18),
                            ),
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                ],
              ))
        ],
      ))),
    );
  }
}
