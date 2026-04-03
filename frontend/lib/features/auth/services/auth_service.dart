import 'package:clerk_flutter/clerk_flutter.dart';
import '../../../core/network/dio_client.dart';

class AuthService {
  static Future<void> syncUser() async {
    final token = await Clerk.instance.session?.getToken();

    if (token == null) {
      throw Exception("No token found");
    }

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