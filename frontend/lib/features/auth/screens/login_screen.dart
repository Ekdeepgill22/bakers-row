import 'package:flutter/material.dart';
import 'package:clerk_flutter/clerk_flutter.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Login")),
      body: const Center(
        // ClerkAuthentication handles both Sign In and Sign Up flows
        child: ClerkAuthentication(), 
      ),
    );
  }
}