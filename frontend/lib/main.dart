import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:clerk_flutter/clerk_flutter.dart';

import 'features/home/screens/home_screen.dart';
import 'features/auth/screens/login_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load();

  final key = dotenv.env['CLERK_PUBLISHABLE_KEY'];

  if (key == null) {
    throw Exception("CLERK_PUBLISHABLE_KEY not found in .env");
  }

  ClerkAuth.of(init(publishableKey: key));

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ClerkAuth(
      signedOutBuilder: (_) => const LoginScreen(),
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: const Color.fromARGB(255, 168, 148, 203)),
        ),
        home: SignedIn(
          child: const HomeScreen(),
        ),
      ),
    );
  }
}