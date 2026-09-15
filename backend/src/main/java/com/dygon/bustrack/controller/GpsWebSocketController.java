package com.dygon.bustrack.controller;

import com.dygon.bustrack.model.GpsLocationUpdate;
import com.dygon.bustrack.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GpsWebSocketController {

    @Autowired
    private BusService busService;

    @MessageMapping("/gps.update")
    @SendTo("/topic/bus-locations")
    public GpsLocationUpdate handleGpsUpdate(GpsLocationUpdate locationUpdate) {
        busService.updateLocation(
                locationUpdate.getBusNumber(),
                locationUpdate.getLatitude(),
                locationUpdate.getLongitude(),
                locationUpdate.getSpeed(),
                locationUpdate.getStatus(),
                locationUpdate.getNextStop(),
                locationUpdate.getEtaMinutes()
        );
        return locationUpdate;
    }
}
