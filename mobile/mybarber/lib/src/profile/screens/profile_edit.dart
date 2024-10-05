import 'package:elegant_notification/elegant_notification.dart';
import 'package:elegant_notification/resources/arrays.dart';
import 'package:elegant_notification/resources/stacked_options.dart';
import 'package:flutter/material.dart';
import 'package:mybarber/main.dart';
import 'package:mybarber/src/login/widgets/formTitle_widget.dart';
import 'package:mybarber/src/profile/domain/model/user_model.dart';
import 'package:mybarber/src/profile/domain/model/user_update_model.dart';
import 'package:mybarber/src/profile/provider/profile_provider.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:provider/provider.dart';

class ProfileEdit extends StatefulWidget {
  final UserModel? userModel;
  final String userId;
  const ProfileEdit({super.key, required this.userModel, required this.userId});

  @override
  _ProfileEditState createState() => _ProfileEditState();
}

class _ProfileEditState extends State<ProfileEdit> {
  final _formKey = GlobalKey<FormState>();
  bool loading = false;

  TextEditingController userNameController = TextEditingController();
  TextEditingController userAddressController = TextEditingController();
  TextEditingController userPhoneController = TextEditingController();
  TextEditingController userEmailController = TextEditingController();
  TextEditingController userPasswordController = TextEditingController();
  TextEditingController rePasswordController = TextEditingController();

  @override
  void initState() {
    super.initState();
    userNameController =
        TextEditingController(text: widget.userModel?.userName);
    userAddressController =
        TextEditingController(text: widget.userModel?.userAddress);
    userPhoneController =
        TextEditingController(text: widget.userModel?.userPhone);
    userEmailController =
        TextEditingController(text: widget.userModel?.userEmail);
  }

  void handleSubmit() async {
    if (_formKey.currentState!.validate()) {
      // start loading
      setState(() {
        loading = true;
      });
      final provider = Provider.of<ProfileProvider>(context, listen: false);
      String userName = userNameController.text;
      String userAddress = userAddressController.text;
      String userPhone = userPhoneController.text;
      String userEmail = userEmailController.text;
      String userPassword = userPasswordController.text;

      UserUpdateModel userUpdateModel = UserUpdateModel(
          userName: userName,
          userAddress: userAddress,
          userPhone: userPhone,
          userEmail: userEmail,
          userPassword: userPassword);

      bool result =
          await provider.updateProfileProvider(widget.userId, userUpdateModel);
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
      // endloading
      setState(() {
        loading = false;
      });
    }
  }

  @override
  void dispose() {
    userNameController.dispose();
    userAddressController.dispose();
    userPhoneController.dispose();
    userEmailController.dispose();
    userPasswordController.dispose();
    rePasswordController.dispose();
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
                title: const Text('My barber',
                    style: TextStyle(
                        color: mainColor,
                        // backgroundColor: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 30)),
                centerTitle: true,
              ),
              // Welcome back text
              formTitle('Modify profile', 'Please fill in your profile!'),

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
                          controller: userEmailController,
                          decoration: InputDecoration(
                              labelText: "Email",
                              prefixIcon: const Icon(Icons.email_outlined),
                              labelStyle: const TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.normal),
                              contentPadding: const EdgeInsets.symmetric(
                                  vertical: 10, horizontal: 15),
                              isDense: true,
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10)),
                              fillColor: Colors.white),
                          keyboardType: TextInputType.emailAddress,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Email is required';
                            }
                            if (!RegExp(r'^[^@]+@[^@]+\.[^@]+')
                                .hasMatch(value)) {
                              return 'Email invalid';
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
                          controller: userNameController,
                          decoration: InputDecoration(
                              labelText: "Name",
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
                              return 'Name is required';
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
                          controller: userPhoneController,
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
                              return 'Phone number is required';
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
                        height: 20,
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 50),
                        child: TextFormField(
                          controller: userAddressController,
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
                          keyboardType: TextInputType.text,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Address is required';
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
                          controller: userPasswordController,
                          obscureText: true,
                          decoration: InputDecoration(
                              labelText: "Password",
                              prefixIcon: const Icon(Icons.password_outlined),
                              labelStyle: const TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.normal),
                              contentPadding: const EdgeInsets.symmetric(
                                  vertical: 10, horizontal: 15),
                              isDense: true,
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10)),
                              fillColor: Colors.white),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Password is required';
                            }
                            if (value.length > 50) {
                              return 'Password must to be at most 50 characters';
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
                          controller: rePasswordController,
                          obscureText: true,
                          decoration: InputDecoration(
                              labelText: "RePassword",
                              prefixIcon: const Icon(Icons.password_outlined),
                              labelStyle: const TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.normal),
                              contentPadding: const EdgeInsets.symmetric(
                                  vertical: 10, horizontal: 15),
                              isDense: true,
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10)),
                              fillColor: Colors.white),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'RePassword is required';
                            }
                            if (value != userPasswordController.text) {
                              return 'Password and RePassword not match';
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
                              ? const CircularProgressIndicator()
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
          ),
        ),
      ),
    );
  }
}
