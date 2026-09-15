package com.dygon.bustrack.controller;

import com.dygon.bustrack.model.User;
import com.dygon.bustrack.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        Optional<User> userOpt = authService.authenticate(email, password);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Login successful",
                    "userId", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "role", user.getRole(),
                    "busNumber", user.getBusNumber() != null ? user.getBusNumber() : "Bus 101",
                    "routeName", user.getRouteName() != null ? user.getRouteName() : "Melmaruvathur - Main Campus",
                    "token", "token-dygon-" + user.getId() + "-" + System.currentTimeMillis()
            ));
        }

        return ResponseEntity.status(401).body(Map.of(
                "success", false,
                "message", "Invalid email or password"
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String name = request.getOrDefault("name", "User");
        String role = request.getOrDefault("role", "STUDENT");
        String busNumber = request.getOrDefault("busNumber", "Bus 101");
        String routeName = request.getOrDefault("routeName", "Melmaruvathur - Main Campus");

        try {
            User newUser = authService.registerUser(email, password, name, role, busNumber, routeName);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Registration successful",
                    "userId", newUser.getId(),
                    "name", newUser.getName(),
                    "email", newUser.getEmail(),
                    "role", newUser.getRole(),
                    "busNumber", newUser.getBusNumber(),
                    "routeName", newUser.getRouteName(),
                    "token", "token-dygon-" + newUser.getId() + "-" + System.currentTimeMillis()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of(
                    "success", false,
                    "message", "Registration failed: " + e.getMessage()
            ));
        }
    }
}
