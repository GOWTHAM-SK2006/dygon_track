package com.dygon.bustrack.service;

import com.dygon.bustrack.model.User;
import com.dygon.bustrack.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusService busService;

    @PostConstruct
    public void initDefaultUsers() {
        if (userRepository.count() == 0) {
            registerUser("student@college.edu", "password123", "Gowtham", "STUDENT", "Bus 101", "Melmaruvathur - Main Campus");
            registerUser("driver@college.edu", "password123", "Ramesh K", "DRIVER", "Bus 101", "Melmaruvathur - Main Campus");
            registerUser("staff@college.edu", "password123", "Siyalomrutti Bipi", "STAFF", "Bus 101", "Melmaruvathur - Main Campus");
            registerUser("admin@college.edu", "password123", "Admin User", "ADMIN", "All Buses", "All Campus Routes");
        }
    }

    public User registerUser(String email, String password, String name, String role, String busNumber, String routeName) {
        User user = new User(email, password, name, role, busNumber, routeName);
        User savedUser = userRepository.save(user);

        if ("DRIVER".equalsIgnoreCase(role) && busNumber != null && !busNumber.isEmpty()) {
            // Register or update Bus fleet entry with driver's details
            busService.updateLocation(
                    busNumber,
                    12.9716,
                    77.5946,
                    0.0,
                    "IDLE",
                    "Main Gate",
                    "2 min"
            );
            // Update driver name and route name
            busService.getBusByNumber(busNumber).ifPresent(b -> {
                b.setDriverName(name);
                b.setRouteName(routeName);
                busService.updateLocation(busNumber, b.getLatitude(), b.getLongitude(), b.getSpeed(), b.getStatus(), b.getNextStop(), b.getEtaMinutes());
            });
        }

        return savedUser;
    }

    public Optional<User> authenticate(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            return userOpt;
        }
        return Optional.empty();
    }
}
