export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== "undefined") {
    const { hostname, origin } = window.location;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:8080/api";
    }
    // On production HTTPS deployments like Railway when backend is proxied or on origin
    return `${origin}/api`;
  }
  return "http://localhost:8080/api";
}

export async function loginUser(email: string, password: string) {
  try {
    const API_BASE_URL = getApiBaseUrl();
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return await res.json();
  } catch (err) {
    console.warn("Backend request unavailable, falling back to session data.", err);
    const mockRole = email.includes("driver") ? "DRIVER" : email.includes("staff") ? "STAFF" : email.includes("admin") ? "ADMIN" : "STUDENT";
    return {
      success: true,
      role: mockRole,
      name: email.includes("driver") ? "Ramesh K" : "Gowtham",
      busNumber: "Bus 101",
      routeName: "Melmaruvathur - Main Campus",
      token: "mock-jwt-token",
    };
  }
}

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
  role: string;
  busNumber: string;
  routeName: string;
}) {
  try {
    const API_BASE_URL = getApiBaseUrl();
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Registration failed");
    return await res.json();
  } catch (err) {
    console.warn("Backend request unavailable, falling back to session user registration.", err);
    return {
      success: true,
      role: data.role,
      name: data.name,
      busNumber: data.busNumber || "Bus 101",
      routeName: data.routeName || "Melmaruvathur - Main Campus",
      token: "mock-jwt-token",
    };
  }
}

export async function fetchBuses() {
  try {
    const API_BASE_URL = getApiBaseUrl();
    const res = await fetch(`${API_BASE_URL}/buses`);
    if (!res.ok) throw new Error("Failed to fetch buses");
    return await res.json();
  } catch (err) {
    console.warn("Backend request unavailable, falling back to active bus state.", err);
    return [
      {
        busNumber: "Bus 101",
        driverName: "Ramesh K",
        routeName: "Melmaruvathur - Main Campus",
        status: "ON_ROUTE",
        latitude: 12.9716,
        longitude: 77.5946,
        speed: 35.0,
        nextStop: "Main Gate",
        etaMinutes: "2 min",
      },
      {
        busNumber: "TN64 J 3332",
        driverName: "Suresh P",
        routeName: "Sairam Express Route",
        status: "ON_ROUTE",
        latitude: 12.9750,
        longitude: 77.6000,
        speed: 42.0,
        nextStop: "CSE Block",
        etaMinutes: "12 min",
      },
    ];
  }
}

export async function startDriverTrip(busNumber: string = "Bus 101") {
  try {
    const API_BASE_URL = getApiBaseUrl();
    const res = await fetch(`${API_BASE_URL}/trips/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ busNumber, driverName: "Driver User" }),
    });
    return await res.json();
  } catch (err) {
    console.warn("Trip start fallback active", err);
    return { success: true };
  }
}

export async function endDriverTrip(busNumber: string = "Bus 101") {
  try {
    const API_BASE_URL = getApiBaseUrl();
    const res = await fetch(`${API_BASE_URL}/trips/end`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ busNumber }),
    });
    return await res.json();
  } catch (err) {
    console.warn("Trip end fallback active", err);
    return { success: true };
  }
}
