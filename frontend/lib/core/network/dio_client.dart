import 'package:dio/dio.dart';

class DioClient {
  static final Dio dio = Dio(
    BaseOptions(
      baseUrl: "http://:5000/api", // change for device
      headers: {
        "Content-Type": "application/json",
      },
    ),
  );
}