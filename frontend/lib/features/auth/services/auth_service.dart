import 'package:clerk_flutter/clerk_flutter.dart';
import '../../../core/network/dio_client.dart';
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthService {
  static final _storage = FlutterSecureStorage();

  static Future<void> login({
    required String name,
    required String email,
    required String phone,
  }) async {
    // Get Clerk session token
    final clerkToken = await Clerk.instance.session?.getToken();
    if (clerkToken == null) throw Exception("No Clerk session");

    // Exchange for your backend JWT
    final response = await DioClient.dio.post(
      "/auth/login",
      data: {
        "clerkToken": clerkToken,
        "name": name,
        "email": email,
        "phone": phone,
      },
    );

    final token = response.data["token"];

    // Store JWT securely
    await _storage.write(key: "jwt", value: token);

    // Set on DioClient for all future requests
    DioClient.dio.options.headers["Authorization"] = "Bearer $token";
  }

  static Future<void> loadToken() async {
    final token = await _storage.read(key: "jwt");
    if (token != null) {
      DioClient.dio.options.headers["Authorization"] = "Bearer $token";
    }
  }

  static Future<void> logout() async {
    await _storage.delete(key: "jwt");
    DioClient.dio.options.headers.remove("Authorization");
  }
}