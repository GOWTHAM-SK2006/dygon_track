package com.dygon.bustrack.service;

import com.dygon.bustrack.model.Bus;
import com.dygon.bustrack.model.GpsLocationUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GpsSimulationService {

    @Autowired
    private BusService busService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Scheduled(fixedRate = 2500)
    public void broadcastLiveGpsUpdates() {
        List<Bus> buses = busService.getAllBuses();

        for (Bus bus : buses) {
            if ("ON_ROUTE".equals(bus.getStatus())) {
                // Simulate coordinate progression
                double deltaLat = (Math.random() - 0.48) * 0.0005;
                double deltaLng = (Math.random() - 0.48) * 0.0005;

                double newLat = bus.getLatitude() + deltaLat;
                double newLng = bus.getLongitude() + deltaLng;
                double newSpeed = 25.0 + Math.random() * 15.0;

                busService.updateLocation(
                        bus.getBusNumber(),
                        newLat,
                        newLng,
                        Math.round(newSpeed * 10.0) / 10.0,
                        bus.getStatus(),
                        bus.getNextStop(),
                        bus.getEtaMinutes()
                );

                GpsLocationUpdate update = new GpsLocationUpdate(
                        bus.getBusNumber(),
                        bus.getDriverName(),
                        bus.getRouteName(),
                        bus.getStatus(),
                        newLat,
                        newLng,
                        Math.round(newSpeed * 10.0) / 10.0,
                        bus.getNextStop(),
                        bus.getEtaMinutes()
                );

                // Broadcast to STOMP WebSocket subscribers at /topic/bus-locations
                messagingTemplate.convertAndSend("/topic/bus-locations", update);
            }
        }
    }
}
