package com.dygon.bustrack.controller;

import com.dygon.bustrack.model.Bus;
import com.dygon.bustrack.model.GpsLocationUpdate;
import com.dygon.bustrack.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/buses")
@CrossOrigin(origins = "*")
public class BusController {

    @Autowired
    private BusService busService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping
    public List<Bus> getAllBuses() {
        return busService.getAllBuses();
    }

    @GetMapping("/{busNumber}")
    public ResponseEntity<?> getBus(@PathVariable String busNumber) {
        return busService.getBusByNumber(busNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{busNumber}/location")
    public ResponseEntity<Bus> updateLocation(@PathVariable String busNumber, @RequestBody Map<String, Object> payload) {
        Double lat = Double.valueOf(payload.get("latitude").toString());
        Double lng = Double.valueOf(payload.get("longitude").toString());
        Double speed = payload.get("speed") != null ? Double.valueOf(payload.get("speed").toString()) : 35.0;
        String status = payload.get("status") != null ? payload.get("status").toString() : "ON_ROUTE";
        String nextStop = payload.get("nextStop") != null ? payload.get("nextStop").toString() : "Main Gate";
        String etaMinutes = payload.get("etaMinutes") != null ? payload.get("etaMinutes").toString() : "2 min";

        Bus updatedBus = busService.updateLocation(busNumber, lat, lng, speed, status, nextStop, etaMinutes);

        // Broadcast to WebSocket clients
        GpsLocationUpdate update = new GpsLocationUpdate(
                busNumber,
                updatedBus.getDriverName(),
                updatedBus.getRouteName(),
                status,
                lat,
                lng,
                speed,
                nextStop,
                etaMinutes
        );
        messagingTemplate.convertAndSend("/topic/bus-locations", update);

        return ResponseEntity.ok(updatedBus);
    }
}
