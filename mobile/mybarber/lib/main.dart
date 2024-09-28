import 'package:flutter/material.dart';
import 'package:mybarber/src/categories/providers/category_provider.dart';
import 'package:mybarber/src/customers/providers/customer_provider.dart';
import 'package:mybarber/src/mainPage.dart';
import 'package:mybarber/src/products/providers/product_provider.dart';
import 'package:mybarber/src/receipts/providers/receipt_provider.dart';
import 'package:mybarber/src/servicesItem/providers/serviceItem_provider.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(create: (_) => CategoryProvider()),
      ChangeNotifierProvider(create: (_) => CustomerProvider()),
      ChangeNotifierProvider(create: (_) => ServiceItemProvider()),
      ChangeNotifierProvider(create: (_) => ProductProvider()),
      ChangeNotifierProvider(create: (_) => ReceiptProvider())
    ],
    child: const MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MY BARBER',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MainPage(),
    );
  }
}
