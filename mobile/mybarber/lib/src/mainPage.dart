import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:mybarber/main.dart';
import 'package:mybarber/src/categories/screens/category_list_screen.dart';
import 'package:mybarber/src/customers/screens/customer_list.dart';
import 'package:mybarber/src/dashboard/screens/dashboard_screen.dart';
import 'package:mybarber/src/login/screens/login.dart';
import 'package:mybarber/src/notFoundWidget.dart';
import 'package:mybarber/src/products/screens/product_list.dart';
import 'package:mybarber/src/profile/screens/profile.dart';
import 'package:mybarber/src/receipts/screens/receipt_list.dart';
import 'package:mybarber/src/servicesItem/screens/serviceItem_list.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);

  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int _selectedIndex = 0;
  String userName = '';
  String userID = '';
  String userRole = '';

  Future<void> _loadUser() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    if (pref.getString('accessToken') != null &&
        pref.getString('accessToken') != '') {
      String token = pref.getString('accessToken')!;
      pref.getString('accessToken')!;
      Map<String, dynamic> decodedToken = JwtDecoder.decode(token);

      setState(() {
        userName = decodedToken['unique_name'] ?? 'No Name';
        userID = decodedToken['User_ID'] ?? '';
        userRole = decodedToken['role'] ?? '';
      });
    } else {
      navigatorKey.currentState
          ?.pushReplacement(MaterialPageRoute(builder: (context) => Login()));
    }
  }

  @override
  void initState() {
    super.initState();
    _loadUser();
  }

  @override
  void dispose() {
    super.dispose();
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  _loadWidget(int index) {
    var nameWidget = "Dashboard";
    switch (index) {
      case 0:
        {
          return const DashboardScreen();
        }
      case 1:
        {
          return const CustomerList();
        }
      case 2:
        {
          return const CategoryListScreen();
        }
      case 3:
        {
          return const ServiceItemList();
        }
      case 4:
        {
          return const ProductList();
        }
      case 5:
        {
          return const ReceiptList();
        }
      case 6:
        {
          return Profile(userId: userID, role: userRole);
        }
      default:
        nameWidget = "None";
        break;
    }
    return NotFoundWidget(title: nameWidget);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'My barber',
          style: TextStyle(fontSize: 20),
        ),
        centerTitle: true,
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: const BoxDecoration(
                  gradient: LinearGradient(
                      colors: [Colors.white, mainColor],
                      begin: AlignmentDirectional.topStart,
                      end: Alignment.bottomRight)),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Expanded(
                      child: CircleAvatar(
                    radius: 50,
                    backgroundColor: mainColor,
                    foregroundColor: Colors.white,
                    child: Text(userName.isNotEmpty ? userName[0] : 'N',
                        style: const TextStyle(fontSize: 40)),
                  )),
                  const SizedBox(
                    height: 6,
                  ),
                  Expanded(
                    child: Text(
                      userName,
                      style: const TextStyle(
                          fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                  )
                ],
              ),
            ),
            ListTile(
              leading: const Icon(
                Icons.dashboard_customize_outlined,
                color: mainColor,
              ),
              title: const Text("Dashboard"),
              onTap: () {
                Navigator.pop(context);
                _selectedIndex = 0;
                _onItemTapped(_selectedIndex);
              },
            ),
            ListTile(
              leading: const Icon(
                Icons.person_2_outlined,
                color: mainColor,
              ),
              title: const Text("Customers"),
              onTap: () {
                Navigator.pop(context);
                _selectedIndex = 1;
                _onItemTapped(_selectedIndex);
              },
            ),
            ListTile(
              leading: const Icon(
                Icons.category_outlined,
                color: mainColor,
              ),
              title: const Text("Categories"),
              onTap: () {
                Navigator.pop(context);
                _selectedIndex = 2;
                _onItemTapped(_selectedIndex);
              },
            ),
            ListTile(
              leading: const Icon(
                Icons.add_reaction_outlined,
                color: mainColor,
              ),
              title: const Text("Services"),
              onTap: () {
                Navigator.pop(context);
                _selectedIndex = 3;
                _onItemTapped(_selectedIndex);
              },
            ),
            ListTile(
              leading: const Icon(
                Icons.card_giftcard,
                color: mainColor,
              ),
              title: const Text("Products"),
              onTap: () {
                Navigator.pop(context);
                _selectedIndex = 4;
                _onItemTapped(_selectedIndex);
              },
            ),
            ListTile(
              leading: const Icon(
                Icons.receipt_long_outlined,
                color: mainColor,
              ),
              title: const Text("Receipts"),
              onTap: () {
                Navigator.pop(context);
                _selectedIndex = 5;
                _onItemTapped(_selectedIndex);
              },
            ),
            ListTile(
              leading: const Icon(
                Icons.person_pin_outlined,
                color: mainColor,
              ),
              title: const Text("Profile"),
              onTap: () {
                Navigator.pop(context);
                _selectedIndex = 6;
                _onItemTapped(_selectedIndex);
              },
            ),
            Divider(),
            ListTile(
              leading: const Icon(
                Icons.logout,
                color: mainColor,
              ),
              title: const Text("Logout"),
              onTap: () async {
                SharedPreferences pref = await SharedPreferences.getInstance();
                pref.remove('accessToken');

                Navigator.pushReplacement(
                    context, MaterialPageRoute(builder: (context) => Login()));
              },
            ),
          ],
        ),
      ),
      body: _loadWidget(_selectedIndex),
    );
  }
}
