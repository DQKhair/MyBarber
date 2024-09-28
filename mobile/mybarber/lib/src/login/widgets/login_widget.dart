import 'package:elegant_notification/elegant_notification.dart';
import 'package:elegant_notification/resources/arrays.dart';
import 'package:elegant_notification/resources/stacked_options.dart';
import 'package:flutter/material.dart';
import 'package:mybarber/src/mainPage.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:mybarber/src/login/widgets/formTitle_widget.dart';

class LoginWidget extends StatefulWidget {
  const LoginWidget({super.key});

  @override
  _LoginWidgetState createState() => _LoginWidgetState();
}

class _LoginWidgetState extends State<LoginWidget> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  bool _isVisibled = false;

  bool setVisible() {
    setState(() {
      _isVisibled = !_isVisibled;
    });

    return _isVisibled;
  }

  void login() async {
    if (_formKey.currentState!.validate()) {
      String email = emailController.text;
      String password = passwordController.text;
      print('$email, $password');
      if (password != '123') {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const MainPage()),
        );

        ElegantNotification.success(
          width: 360,
          isDismissable: false,
          stackedOptions: StackedOptions(
            key: 'top',
            type: StackedType.same,
            itemOffset: const Offset(-5, -5),
          ),
          title: const Text('Login'),
          description: const Text('Login successful!'),
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
          width: 360,
          stackedOptions: StackedOptions(
            key: 'topRight',
            type: StackedType.below,
            itemOffset: const Offset(0, 5),
          ),
          position: Alignment.topRight,
          animation: AnimationType.fromRight,
          title: const Text('Error'),
          description: const Text('Login failed!'),
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
              // Welcome back text
              formTitle('Welcome back!', 'Login to continue'),

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
                          controller: emailController,
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
                          controller: passwordController,
                          obscureText: !_isVisibled, // Ẩn mật khẩu
                          decoration: InputDecoration(
                              labelText: "Password",
                              prefixIcon: const Icon(Icons.password_outlined),
                              suffixIcon: IconButton(
                                icon: Icon(_isVisibled
                                    ? Icons.visibility
                                    : Icons.visibility_off),
                                onPressed: () {
                                  setState(() {
                                    _isVisibled = !_isVisibled;
                                  });
                                },
                              ),
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
                        height: 10,
                      ),

                      // login button
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 50, vertical: 10),
                        child: ElevatedButton(
                          onPressed: login,
                          style: ElevatedButton.styleFrom(
                              padding: const EdgeInsets.symmetric(vertical: 10),
                              backgroundColor: mainColor,
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10))),
                          child: const Text(
                            'Login',
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
        ),
      ),
    );
  }
}
