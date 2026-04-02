import 'package:dio/dio.dart';
import '../../../core/network/dio_client.dart';

class AuthService {
  static Future<void> syncUser(String token) async {
    await DioClient.dio.post(
      "/users/sync",
      data: {
        "name": "Test User",
        "email": "test@test.com",
        "phone": "9999999999",
      },
      options: Options(
        headers: {
          "Authorization": "Bearer $token",
        },
      ),
    );
  }
}