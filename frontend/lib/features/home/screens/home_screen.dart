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
    final user = clerkAuth.user;

    if (user == null) {
      print("No user found");
      return;
    }

    final email = user.emailAddresses?.isNotEmpty == true
        ? user.emailAddresses!.first.emailAddress
        : "";

    await AuthService.login(
      clerkId: user.id,
      name: user.firstName ?? "User",
      email: email,
      phone: "",
    );

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