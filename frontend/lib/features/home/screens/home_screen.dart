import 'package:flutter/material.dart';
import '../../auth/services/auth_service.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {

  @override
  void initState() {
    super.initState();
    syncUser();
  }

  Future<void> syncUser() async {
    try {
      await AuthService.syncUser();
      print("User synced successfully");
    } catch (e) {
      print("Sync error: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text("Home Screen"),
      ),
    );
  }
}