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
  await AuthService.login(
    name: Clerk.instance.user?.firstName ?? "User",
    email: Clerk.instance.user?.emailAddresses.first.emailAddress ?? "",
    phone: "",
  );
  }
}

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: Text("Home Screen")),
    );
  }
}