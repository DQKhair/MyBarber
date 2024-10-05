import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mybarber/main.dart';
import 'package:mybarber/src/login/screens/login.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HttpMethod {
  final String baseUrl;

  HttpMethod({required this.baseUrl});

  Future<String?> _getToken() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    return pref.getString('accessToken');
  }

  //get method
  Future<http.Response> get(String endpoint) async {
    final String? token = await _getToken();
    final response = await http.get(
      Uri.parse('$baseUrl/$endpoint'),
      headers: <String, String>{
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );
    if (response.statusCode == 401) {
      navigatorKey.currentState?.pushReplacement(
        MaterialPageRoute(builder: (context) => const Login()),
      );
      return throw Exception('Fail to get method');
    } else {
      return response;
    }
  }

  //post method
  Future<http.Response> post(String endpoint, Map<String, dynamic> data) async {
    final String? token = await _getToken();
    final response = await http.post(
      Uri.parse('$baseUrl/$endpoint'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(data),
    );
    if (response.statusCode == 401) {
      navigatorKey.currentState?.pushReplacement(
        MaterialPageRoute(builder: (context) => const Login()),
      );
      return throw Exception('Fail to get method');
    } else {
      return response;
    }
  }

  // put method
  Future<http.Response> put(String endpoint, Map<String, dynamic> data) async {
    final String? token = await _getToken();
    final response = await http.put(
      Uri.parse('$baseUrl/$endpoint'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(data),
    );
    if (response.statusCode == 401) {
      navigatorKey.currentState?.pushReplacement(
        MaterialPageRoute(builder: (context) => const Login()),
      );
      return throw Exception('Fail to get method');
    } else {
      return response;
    }
  }

   // put method not body
  Future<http.Response> putNoBody(String endpoint) async {
    final String? token = await _getToken();
    final response = await http.put(
      Uri.parse('$baseUrl/$endpoint'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );
    if (response.statusCode == 401) {
      navigatorKey.currentState?.pushReplacement(
        MaterialPageRoute(builder: (context) => const Login()),
      );
      return throw Exception('Fail to get method');
    } else {
      return response;
    }
  }

  // delete method
  Future<http.Response> delete(String endpoint) async {
    final String? token = await _getToken();
    final response = await http.delete(
      Uri.parse('$baseUrl/$endpoint'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );
    if (response.statusCode == 401) {
      navigatorKey.currentState?.pushReplacement(
        MaterialPageRoute(builder: (context) => const Login()),
      );
      return throw Exception('Fail to get method');
    } else {
      return response;
    }
  }
}
