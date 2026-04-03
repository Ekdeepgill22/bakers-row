import 'package:flutter/material.dart';
import 'package:clerk_flutter/clerk_flutter.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Login")),
      body: Center(
        child: ClerkAuth(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SignInButton(),
              const SizedBox(height: 20),
              SignUpButton(),
            ],
          ),
        ),
      ),
    );
  }
}