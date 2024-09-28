import 'package:flutter/material.dart';
import 'package:mybarber/src/categories/screens/category_list_screen.dart';
import 'package:mybarber/src/customers/screens/customer_list.dart';
import 'package:mybarber/src/dashboard/widgets/dashboard_widget.dart';
import 'package:mybarber/src/login/widgets/login_widget.dart';
import 'package:mybarber/src/notFoundWidget.dart';
import 'package:mybarber/src/products/screens/product_list.dart';
import 'package:mybarber/src/profile/widgets/profile_widget.dart';
import 'package:mybarber/src/receipts/screens/receipt_list.dart';
import 'package:mybarber/src/servicesItem/screens/serviceItem_list.dart';
import 'package:mybarber/src/utils/env.dart';

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);

  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int _selectedIndex = 0;
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
        return const DashboardWidget();
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
          return const ProfileWidget();
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
            const DrawerHeader(
              decoration: BoxDecoration(
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
                    child: Text("K", style: TextStyle(fontSize: 40)),
                  )),
                  SizedBox(
                    height: 6,
                  ),
                  Text(
                    "Name",
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
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
              onTap: () {
                Navigator.pushReplacement(context,
                    MaterialPageRoute(builder: (context) => LoginWidget()));
              },
            ),
          ],
        ),
      ),
      body: _loadWidget(_selectedIndex),
    );
  }
}
