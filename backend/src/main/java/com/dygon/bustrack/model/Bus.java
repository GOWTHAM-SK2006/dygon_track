package com.dygon.bustrack.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "buses")
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String busNumber;

    private String driverName;
    private String routeName;
    private String status; // ON_ROUTE, IDLE, DELAYED
    
    private Double latitude;
    private Double longitude;
    private Double speed;
    
    private String nextStop;
    private String etaMinutes;
    
    private LocalDateTime lastUpdated;

    public Bus() {}

    public Bus(String busNumber, String driverName, String routeName, String status, Double latitude, Double longitude, Double speed, String nextStop, String etaMinutes) {
        this.busNumber = busNumber;
        this.driverName = driverName;
        this.routeName = routeName;
        this.status = status;
        this.latitude = latitude;
        this.longitude = longitude;
        this.speed = speed;
        this.nextStop = nextStop;
        this.etaMinutes = etaMinutes;
        this.lastUpdated = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }

    public String getDriverName() { return driverName; }
    public void setDriverName(String driverName) { this.driverName = driverName; }

    public String getRouteName() { return routeName; }
    public void setRouteName(String routeName) { this.routeName = routeName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public Double getSpeed() { return speed; }
    public void setSpeed(Double speed) { this.speed = speed; }

    public String getNextStop() { return nextStop; }
    public void setNextStop(String nextStop) { this.nextStop = nextStop; }

    public String getEtaMinutes() { return etaMinutes; }
    public void setEtaMinutes(String etaMinutes) { this.etaMinutes = etaMinutes; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }
}
