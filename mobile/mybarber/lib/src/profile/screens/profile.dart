import 'package:flutter/material.dart';
import 'package:mybarber/src/profile/provider/profile_provider.dart';
import 'package:mybarber/src/profile/screens/profile_edit.dart';
import 'package:mybarber/src/profile/widgets/profileDetail_widget.dart';
import 'package:provider/provider.dart';

class Profile extends StatefulWidget {
  final String userId;
  final String role;
  const Profile({super.key, required this.userId, required this.role});

  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  late Future<void> _loadProfileFuture;

  @override
  void initState() {
    super.initState();
    final provider = Provider.of<ProfileProvider>(context, listen: false);
    _loadProfileFuture = provider.loadProfile(widget.userId);
  }

  @override
  Widget build(BuildContext context) {
    final profileProvider = Provider.of<ProfileProvider>(context);
    return Scaffold(
      body: FutureBuilder<void>(
          future: _loadProfileFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            } else if (snapshot.hasError) {
              return Center(
                  child: Text('Error loading profile: ${snapshot.error}'));
            }
            return Container(
              padding: EdgeInsets.all(20),
              child: Center(
                child: Column(
                  children: [
                    Expanded(
                        child: profileDetail(
                            profileProvider.userModel, widget.role, context)),
                  ],
                ),
              ),
            );
          }),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => ProfileEdit(userModel: profileProvider.userModel,userId: widget.userId,)));
        },
        backgroundColor: Colors.yellow[600],
        shape: const CircleBorder(),
        child: const Icon(
          Icons.edit,
          color: Colors.white,
        ),
      ),
    );
  }
}
