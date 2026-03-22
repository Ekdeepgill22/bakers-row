import '../../../core/network/dio_client.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';


class AuthService {
  static final _storage = FlutterSecureStorage();

  static Future<void> login({
  required String clerkId,
  required String name,
  required String email,
  required String phone,
}) async {
  final response = await DioClient.dio.post(
    "/auth/login",
    data: {
      "clerk_id": clerkId,
      "name": name,
      "email": email,
      "phone": phone,
    },
  );

  final token = response.data["token"];

  await _storage.write(key: "jwt", value: token);

  DioClient.dio.options.headers["Authorization"] = "Bearer $token";
}}