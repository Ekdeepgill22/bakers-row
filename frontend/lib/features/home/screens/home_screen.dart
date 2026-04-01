import 'package:flutter/material.dart';
import 'package:clerk_flutter/clerk_flutter.dart';
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

    WidgetsBinding.instance.addPostFrameCallback((_) {
      syncUser();
    });
  }

  Future<void> syncUser() async {
    try {
      final clerkAuth = ClerkAuth.of(context);

      final token = await clerkAuth.getToken();

      if (token == null) {
        print("No token");
        return;
    }

      print("TOKEN: $token");

      await AuthService.syncUser(token!);

      print("User synced successfully");
    } catch (e) {
      print("Sync error: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: Text("Home Screen")),
    );
  }
}