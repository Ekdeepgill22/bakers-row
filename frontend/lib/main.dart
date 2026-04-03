import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:clerk_flutter/clerk_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load();

  Clerk.init(
    publishableKey: dotenv.env['CLERK_PUBLISHABLE_KEY']!,
  );

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: ClerkAuth(
        child: SignedIn(
          child: HomeScreen(),
        ),
        signedOutBuilder: (_) => const LoginScreen(),
      ),
    );
  }
}