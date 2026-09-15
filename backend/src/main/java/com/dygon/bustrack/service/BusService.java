package com.dygon.bustrack.service;

import com.dygon.bustrack.model.Bus;
import com.dygon.bustrack.repository.BusRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BusService {

    @Autowired
    private BusRepository busRepository;

    @PostConstruct
    public void initDefaultFleet() {
        if (busRepository.count() == 0) {
            busRepository.save(new Bus("Bus 101", "Ramesh K", "Melmaruvathur - Main Campus", "ON_ROUTE", 12.9716, 77.5946, 35.0, "Main Gate", "2 min"));
            busRepository.save(new Bus("TN64 J 3332", "Suresh P", "Sairam Express Route", "ON_ROUTE", 12.9750, 77.6000, 42.0, "CSE Block", "12 min"));
            busRepository.save(new Bus("Bus 102", "Karthik R", "Hostel Shuttle", "IDLE", 12.9800, 77.6050, 0.0, "Depot", "—"));
            busRepository.save(new Bus("Bus 103", "Venkatesh M", "Library Circular", "DELAYED", 12.9730, 77.5980, 18.0, "Library North", "18 min"));
        }
    }

    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    public Optional<Bus> getBusByNumber(String busNumber) {
        return busRepository.findByBusNumber(busNumber);
    }

    public Bus updateLocation(String busNumber, Double latitude, Double longitude, Double speed, String status, String nextStop, String etaMinutes) {
        Bus bus = busRepository.findByBusNumber(busNumber)
                .orElseGet(() -> new Bus(busNumber, "Driver", "Main Campus Route", status, latitude, longitude, speed, nextStop, etaMinutes));

        bus.setLatitude(latitude);
        bus.setLongitude(longitude);
        if (speed != null) bus.setSpeed(speed);
        if (status != null) bus.setStatus(status);
        if (nextStop != null) bus.setNextStop(nextStop);
        if (etaMinutes != null) bus.setEtaMinutes(etaMinutes);
        bus.setLastUpdated(LocalDateTime.now());

        return busRepository.save(bus);
    }
}
