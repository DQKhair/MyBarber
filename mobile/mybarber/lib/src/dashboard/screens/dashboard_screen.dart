import 'package:flutter/material.dart';
import 'package:mybarber/src/dashboard/widgets/barChart.dart';
import 'package:mybarber/src/utils/env.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  _DashboardScreenState createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Dashboard',
          style: TextStyle(color: mainColor),
        ),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Expanded(
              child: Column(
            children: [
              const Text(
                'Statistic receipts (VNĐ)',
                style: TextStyle(
                    color: mainColor,
                    fontSize: 16,
                    fontWeight: FontWeight.bold),
              ),
              const SizedBox(
                height: 16,
              ),
              Expanded(
                child: ListView.builder(
                    itemCount: 1,
                    itemBuilder: (context, index) {
                      return Center(child: chart());
                    }),
              ),
            ],
          )),
          Expanded(
            child: GridView.builder(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2, crossAxisSpacing: 1, mainAxisSpacing: 1),
              itemCount: 4,
              itemBuilder: (context, index) {
                return Container(
                  decoration: BoxDecoration(
                    color: const Color.fromARGB(255, 238, 242, 247),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  margin: const EdgeInsets.all(5),
                  child: Center(
                      child: Image.asset(
                          'assets/images/dashboardImg${index + 1}.jpg')),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

Widget chart() {
  return const Center(child: BarChartReceipt());
}
