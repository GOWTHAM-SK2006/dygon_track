package com.dygon.bustrack.controller;

import com.dygon.bustrack.model.Trip;
import com.dygon.bustrack.repository.TripRepository;
import com.dygon.bustrack.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "*")
public class TripController {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private BusService busService;

    @PostMapping("/start")
    public ResponseEntity<Trip> startTrip(@RequestBody Map<String, String> request) {
        String busNumber = request.getOrDefault("busNumber", "TN64 J 3332");
        String driverName = request.getOrDefault("driverName", "Ramesh K");
        String routeName = request.getOrDefault("routeName", "Main Campus Route");

        busService.updateLocation(busNumber, 12.9716, 77.5946, 35.0, "ON_ROUTE", "Main Gate", "2 min");

        Trip trip = new Trip(busNumber, driverName, routeName);
        return ResponseEntity.ok(tripRepository.save(trip));
    }

    @PostMapping("/end")
    public ResponseEntity<?> endTrip(@RequestBody Map<String, String> request) {
        String busNumber = request.getOrDefault("busNumber", "TN64 J 3332");

        List<Trip> activeTrips = tripRepository.findByBusNumberAndStatus(busNumber, "ACTIVE");
        for (Trip trip : activeTrips) {
            trip.setStatus("COMPLETED");
            trip.setEndTime(LocalDateTime.now());
            tripRepository.save(trip);
        }

        busService.updateLocation(busNumber, 12.9716, 77.5946, 0.0, "IDLE", "Depot", "—");

        return ResponseEntity.ok(Map.of("success", true, "message", "Trip ended successfully"));
    }
}
