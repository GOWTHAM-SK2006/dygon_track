package com.dygon.bustrack.model;

import java.time.LocalDateTime;

public class GpsLocationUpdate {
    private String busNumber;
    private String driverName;
    private String routeName;
    private String status;
    private Double latitude;
    private Double longitude;
    private Double speed;
    private String nextStop;
    private String etaMinutes;
    private String timestamp;

    public GpsLocationUpdate() {}

    public GpsLocationUpdate(String busNumber, String driverName, String routeName, String status, Double latitude, Double longitude, Double speed, String nextStop, String etaMinutes) {
        this.busNumber = busNumber;
        this.driverName = driverName;
        this.routeName = routeName;
        this.status = status;
        this.latitude = latitude;
        this.longitude = longitude;
        this.speed = speed;
        this.nextStop = nextStop;
        this.etaMinutes = etaMinutes;
        this.timestamp = LocalDateTime.now().toString();
    }

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

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
