import 'package:flutter/material.dart';
import 'package:mybarber/src/profile/domain/model/user_model.dart';
import 'package:mybarber/src/utils/env.dart';

Widget profileDetail(UserModel? userModel, String role, BuildContext context) {
  return SingleChildScrollView(
    child: Column(
      children: [
        Row(
          children: [
            Expanded(
              child: Container(
                decoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                    gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Colors.blue, mainColor])),
                child: Column(
                  children: [
                    const SizedBox(height: 16),
                    Stack(
                      alignment: const Alignment(0.2, 1.5),
                      children: [
                        const CircleAvatar(
                          backgroundImage:
                              AssetImage('assets/images/avataUser.png'),
                          radius: 100,
                        ),
                        Positioned(
                          bottom: 0,
                          left: 0,
                          right: 0,
                          child: Center(
                            child: Container(
                              decoration: const BoxDecoration(
                                color: Colors.black45,
                              ),
                              child: Expanded(
                                child: Text(
                                  userModel?.userName ?? '',
                                  style: const TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                  ],
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "Account Info",
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                const Icon(
                  Icons.admin_panel_settings,
                  color: mainColor,
                ),
                const SizedBox(width: 10),
                Expanded(child: Text("Role: $role"))
              ],
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                const Icon(
                  Icons.mail,
                  color: mainColor,
                ),
                const SizedBox(width: 10),
                Expanded(child: Text('Email: ${userModel?.userEmail ?? ""}')),
              ],
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                const Icon(
                  Icons.location_on,
                  color: mainColor,
                ),
                const SizedBox(width: 10),
                Expanded(
                    child: Text('Address: ${userModel?.userAddress ?? ""}')),
              ],
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                const Icon(
                  Icons.phone,
                  color: mainColor,
                ),
                const SizedBox(width: 10),
                Expanded(child: Text('Phone: ${userModel?.userPhone ?? ""}')),
              ],
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                const Icon(
                  Icons.key,
                  color: mainColor,
                ),
                const SizedBox(width: 10),
                Expanded(child: Text('ID: ${userModel?.user_ID ?? ""}')),
              ],
            ),
            const SizedBox(height: 20),
          ],
        ),
        const SizedBox(
          height: 16,
        ),
      ],
    ),
  );
}
