"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { startDriverTrip, endDriverTrip } from "@/lib/api";
import { 
  Bus, 
  Play, 
  Square, 
  LogOut,
  Route,
  Activity,
  Wifi,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  Radio,
  Plus,
  Minus,
  Volume2
} from "lucide-react";

export default function DriverDashboard() {
  const [tripState, setTripState] = useState<"On Route" | "Not Started" | "Completed">("On Route");
  
  const [driverName, setDriverName] = useState("Ramesh K");
  const [busNumber, setBusNumber] = useState("Bus 101");
  const [routeName, setRouteName] = useState("Melmaruvathur - Main Campus");
  const [speed, setSpeed] = useState<number>(38);
  const [passengers, setPassengers] = useState<number>(42);
  const [activeStop, setActiveStop] = useState<string>("Main Gate");
  const [eta, setEta] = useState<string>("2 min");
  const [alertSent, setAlertSent] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dygon_user");
      if (stored) {
        const user = JSON.parse(stored);
        if (user.name) setDriverName(user.name);
        if (user.busNumber) setBusNumber(user.busNumber);
        if (user.routeName) setRouteName(user.routeName);
      }
    } catch (e) {
      console.warn("No session user found, using default Driver details.", e);
    }
  }, []);

  // Speed simulation loop when trip is active
  useEffect(() => {
    if (tripState !== "On Route") return;
    const interval = setInterval(() => {
      setSpeed(prev => Math.max(25, Math.min(55, Math.floor(prev + (Math.random() * 6 - 3)))));
    }, 3000);
    return () => clearInterval(interval);
  }, [tripState]);

  const handleStartTrip = async () => {
    setTripState("On Route");
    await startDriverTrip(busNumber);
  };

  const handleEndTrip = async () => {
    setTripState("Completed");
    setSpeed(0);
    await endDriverTrip(busNumber);
  };

  const triggerQuickAlert = (message: string) => {
    setAlertSent(message);
    setTimeout(() => setAlertSent(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col pb-12">
      
      {/* Top Header Bar - Primary Yellow & Red Styling */}
      <header className="bg-white border-b-2 border-red-600 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-red-600 flex items-center justify-center font-black shadow-md border-2 border-red-600">
            <Bus className="w-6 h-6 fill-current stroke-[2.2]" />
          </div>
          <div>
            <div className="font-black text-lg text-slate-900 tracking-tight leading-none flex items-center gap-2">
              DYGON BUS TRACK
              <span className="bg-red-600 text-yellow-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Driver Portal
              </span>
            </div>
            <p className="text-xs text-red-600 font-bold mt-0.5">
              Live GPS Broadcast Controller
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-black">
            <Radio className="w-4 h-4 text-red-600 animate-pulse" />
            <span>GPS ONLINE</span>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-yellow-400 text-slate-950 font-black flex items-center justify-center text-sm shadow border border-yellow-500">
              {driverName.charAt(0)}
            </div>
            <div className="text-left hidden md:block">
              <div className="font-black text-xs text-slate-900">{driverName}</div>
              <div className="text-[10px] text-red-600 font-extrabold">{busNumber} Driver</div>
            </div>
          </div>

          <Link
            href="/login"
            className="p-2.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Banner Alert Toast */}
        {alertSent && (
          <div className="bg-red-600 text-yellow-300 border-2 border-yellow-400 px-5 py-3.5 rounded-2xl font-black text-sm flex items-center justify-between shadow-xl animate-bounce">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 stroke-[2.5]" />
              <span>Broadcast Sent: {alertSent}</span>
            </div>
            <span className="text-xs font-black uppercase tracking-wider bg-yellow-400 text-slate-950 px-2.5 py-1 rounded-lg">
              Notified
            </span>
          </div>
        )}

        {/* Assigned Vehicle & Active Route Info Banner (YELLOW & RED PRIMARY) */}
        <div className="bg-white rounded-3xl p-6 border-2 border-yellow-400 shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center font-black shadow-md border-2 border-red-600">
                <Bus className="w-9 h-9 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-600 font-black uppercase tracking-wider">Assigned Bus</span>
                  <span className="bg-yellow-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md border border-yellow-500">
                    REGISTERED
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{busNumber}</h1>
                <p className="text-sm text-slate-600 font-extrabold flex items-center gap-1.5 mt-0.5">
                  <Route className="w-4 h-4 text-red-600 shrink-0" />
                  {routeName}
                </p>
              </div>
            </div>

            {/* Live Trip Status Badge */}
            <div className="flex items-center gap-3">
              {tripState === "On Route" ? (
                <div className="bg-red-600 text-yellow-300 border-2 border-yellow-400 px-6 py-3 rounded-2xl flex items-center gap-2.5 font-black text-sm shadow-md">
                  <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 animate-ping" />
                  <span>TRIP ACTIVE & BROADCASTING</span>
                </div>
              ) : tripState === "Completed" ? (
                <div className="bg-slate-800 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-sm">
                  TRIP COMPLETED
                </div>
              ) : (
                <div className="bg-yellow-400 text-slate-950 border-2 border-red-600 px-6 py-3 rounded-2xl font-black text-sm shadow-sm">
                  STANDBY - READY TO START
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MAXIMIZED TRIP CONTROLS (YELLOW & RED PRIMARY GIANT BUTTONS) */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-600" />
              Main Trip Controls
            </h2>
            <span className="text-xs text-red-600 font-bold uppercase tracking-wider">Touch-friendly large controls</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
            
            {/* GIANT START TRIP BUTTON - PRIMARY YELLOW */}
            <button
              onClick={handleStartTrip}
              className={`w-full py-7 px-8 rounded-3xl font-black text-xl sm:text-2xl transition-all transform active:scale-95 flex items-center justify-center gap-4 shadow-xl border-2 ${
                tripState === "On Route"
                  ? "bg-yellow-400 text-slate-950 border-red-600 ring-4 ring-yellow-400/50 shadow-yellow-400/30"
                  : "bg-yellow-400 hover:bg-yellow-500 text-slate-950 border-yellow-500 shadow-yellow-400/20"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-950 text-yellow-400 flex items-center justify-center shrink-0 shadow">
                <Play className="w-7 h-7 fill-current" />
              </div>
              <div className="text-left">
                <div className="tracking-tight">START TRIP</div>
                <div className="text-xs font-extrabold text-slate-800 opacity-90">Begin Live GPS Broadcasting</div>
              </div>
            </button>

            {/* GIANT END TRIP BUTTON - PRIMARY RED */}
            <button
              onClick={handleEndTrip}
              className={`w-full py-7 px-8 rounded-3xl font-black text-xl sm:text-2xl transition-all transform active:scale-95 flex items-center justify-center gap-4 shadow-xl border-2 ${
                tripState === "Completed"
                  ? "bg-red-700 text-white border-yellow-400 ring-4 ring-red-500/40 shadow-red-600/30"
                  : "bg-red-600 hover:bg-red-700 text-white border-red-700 shadow-red-600/20"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white text-red-600 flex items-center justify-center shrink-0 shadow">
                <Square className="w-7 h-7 fill-current" />
              </div>
              <div className="text-left">
                <div className="tracking-tight">END TRIP</div>
                <div className="text-xs font-extrabold text-red-100 opacity-90">Finish & Stop Telemetry</div>
              </div>
            </button>

          </div>
        </div>

        {/* MAXIMIZED TELEMETRY & LIVE DRIVER METRICS GRID (YELLOW & RED PRIMARY ACCENTS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* CARD 1: LIVE SPEED */}
          <div className="bg-white rounded-3xl p-5 border-2 border-yellow-400 shadow-md flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Current Speed</span>
              <Gauge className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
                {speed}
                <span className="text-lg font-black text-red-600">km/h</span>
              </div>
              <div className="text-xs text-slate-600 font-extrabold mt-1 flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-red-600" />
                14 GPS Satellites Locked
              </div>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-300">
              <div 
                className="bg-yellow-400 h-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (speed / 60) * 100)}%` }}
              />
            </div>
          </div>

          {/* CARD 2: NEXT BUS STOP & ETA */}
          <div className="bg-white rounded-3xl p-5 border-2 border-red-500/80 shadow-md flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Next Bus Stop</span>
              <MapPin className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 truncate">{activeStop}</div>
              <div className="text-3xl font-black text-red-600 mt-1 flex items-center gap-1.5">
                <Clock className="w-6 h-6 text-red-600" />
                {eta}
              </div>
            </div>
            <button
              onClick={() => triggerQuickAlert(`Arrived at ${activeStop}`)}
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs transition shadow-sm"
            >
              Announce Arrival
            </button>
          </div>

          {/* CARD 3: PASSENGER ONBOARD COUNTER */}
          <div className="bg-white rounded-3xl p-5 border-2 border-yellow-400 shadow-md flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Passengers Onboard</span>
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
                {passengers}
                <span className="text-base font-black text-slate-400">/ 55</span>
              </div>
              <div className="text-xs text-red-600 font-extrabold mt-1">
                13 Seats Available
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPassengers(p => Math.max(0, p - 1))}
                className="flex-1 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-900 font-black flex items-center justify-center gap-1 text-base border border-slate-300"
              >
                <Minus className="w-4 h-4 stroke-[3]" />
              </button>
              <button
                onClick={() => setPassengers(p => Math.min(55, p + 1))}
                className="flex-1 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black flex items-center justify-center gap-1 text-base border border-yellow-500 shadow-sm"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* CARD 4: VEHICLE SYSTEM */}
          <div className="bg-white rounded-3xl p-5 border-2 border-red-500/80 shadow-md flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Vehicle System</span>
              <CheckCircle2 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-xl font-black text-red-600">OPTIMAL</div>
              <div className="text-xs text-slate-600 font-bold mt-1">
                Engine: Normal Temp • Brakes: Good • Fuel: 85%
              </div>
            </div>
            <div className="text-[11px] text-slate-700 font-mono bg-yellow-50 p-2 rounded-xl border border-yellow-200 font-bold">
              Topic: /topic/bus-locations
            </div>
          </div>

        </div>

        {/* QUICK BROADCAST ACTION CONTROLS (YELLOW & RED PRIMARY) */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl space-y-4">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-red-600" />
            Quick Driver Broadcast Alerts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => triggerQuickAlert("Traffic Delay (+5 min)")}
              className="p-4 rounded-2xl bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-400 text-slate-900 font-black text-sm flex items-center gap-3 transition text-left shadow-sm"
            >
              <Clock className="w-6 h-6 text-red-600 shrink-0" />
              <div>
                <div className="text-slate-900 font-black">Traffic Delay (+5 min)</div>
                <div className="text-[11px] text-red-600 font-extrabold">Notify delayed ETA</div>
              </div>
            </button>

            <button
              onClick={() => triggerQuickAlert("Bus Fully Occupied")}
              className="p-4 rounded-2xl bg-red-50 hover:bg-red-100 border-2 border-red-300 text-slate-900 font-black text-sm flex items-center gap-3 transition text-left shadow-sm"
            >
              <Users className="w-6 h-6 text-red-600 shrink-0" />
              <div>
                <div className="text-slate-900 font-black">Bus Full Alert</div>
                <div className="text-[11px] text-red-600 font-extrabold">Notify full capacity</div>
              </div>
            </button>

            <button
              onClick={() => triggerQuickAlert("EMERGENCY ASSISTANCE REQUESTED")}
              className="p-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm flex items-center gap-3 transition text-left shadow-md border-2 border-yellow-400"
            >
              <AlertTriangle className="w-6 h-6 text-yellow-300 shrink-0" />
              <div>
                <div className="text-white font-black">Emergency SOS</div>
                <div className="text-[11px] text-yellow-300 font-bold">Alert transport admin</div>
              </div>
            </button>
          </div>
        </div>

      </main>

    </div>
  );
}
