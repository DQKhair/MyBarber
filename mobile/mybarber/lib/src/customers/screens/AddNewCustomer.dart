import 'package:elegant_notification/elegant_notification.dart';
import 'package:elegant_notification/resources/arrays.dart';
import 'package:elegant_notification/resources/stacked_options.dart';
import 'package:flutter/material.dart';
import 'package:mybarber/src/customers/domain/models/customerVM_model.dart';
import 'package:mybarber/src/customers/providers/customer_provider.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:provider/provider.dart';
import 'package:mybarber/src/login/widgets/formTitle_widget.dart';

class AddNewCustomer extends StatefulWidget {
  const AddNewCustomer({Key? key}) : super(key: key);

  @override
  _AddNewCustomerState createState() => _AddNewCustomerState();
}

class _AddNewCustomerState extends State<AddNewCustomer> {
  final _formKey = GlobalKey<FormState>();

  TextEditingController customerNameController = TextEditingController();
  TextEditingController customerPhoneController = TextEditingController();
  TextEditingController customerAddressController = TextEditingController();

  void handleSubmit() async {
    if (_formKey.currentState!.validate()) {
      String customerName = customerNameController.text;
      String customerPhone = customerPhoneController.text;
      String customerAddress = customerAddressController.text;

      CustomerVM newCustomer = CustomerVM(
          customerName: customerName,
          customerAddress: customerAddress,
          customerPhone: customerPhone);

      print(newCustomer);
      bool result = await Provider.of<CustomerProvider>(context, listen: false)
          .addCustomerProvider(newCustomer);

      if (result) {
        customerNameController.clear();
        customerPhoneController.clear();
        customerAddressController.clear();

        //alert
        ElegantNotification.success(
          width: 360,
          isDismissable: false,
          stackedOptions: StackedOptions(
            key: 'top',
            type: StackedType.same,
            itemOffset: const Offset(-5, -5),
          ),
          title: const Text('Add new'),
          description: const Text('Successful added new customer!'),
          onDismiss: () {},
          onNotificationPressed: () {},
          border: const Border(
            bottom: BorderSide(
              color: Colors.green,
              width: 2,
            ),
          ),
        ).show(context);
        //navigate
        Navigator.pop(context);
      } else {
        ElegantNotification.error(
          width: 360,
          stackedOptions: StackedOptions(
            key: 'topRight',
            type: StackedType.below,
            itemOffset: const Offset(0, 5),
          ),
          position: Alignment.topRight,
          animation: AnimationType.fromRight,
          title: const Text('Error'),
          description: const Text('Add new customer failed!'),
          onDismiss: () {},
        ).show(context);
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
              title: const Text('My barber',
                  style: TextStyle(
                      color: mainColor,
                      // backgroundColor: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 30)),
              centerTitle: true,
            ),
            formTitle('Add new customer', 'Please fill in your form'),
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
                            labelText: "Name",
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
                            prefixIcon:
                                const Icon(Icons.phone_android_outlined),
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
                            prefixIcon:
                                const Icon(Icons.location_city_outlined),
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
                    // submit button
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 50, vertical: 10),
                      child: ElevatedButton(
                        onPressed: handleSubmit,
                        style: ElevatedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 10),
                            backgroundColor: mainColor,
                            foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10))),
                        child: const Text(
                          'Add',
                          style: TextStyle(fontSize: 18),
                        ),
                      ),
                    ),
                    // other login title
                    const SizedBox(
                      height: 20,
                    ),
                  ],
                ))
          ],
        ),
      )),
    );
  }
}
