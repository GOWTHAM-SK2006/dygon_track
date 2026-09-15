package com.dygon.bustrack.repository;

import com.dygon.bustrack.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByBusNumberAndStatus(String busNumber, String status);
}
