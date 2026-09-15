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
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col pb-12">
      
      {/* Top Navigation Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-lg">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center font-black shadow-md ring-2 ring-yellow-400/30">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <div className="font-black text-lg text-white tracking-tight leading-none flex items-center gap-2">
              DYGON BUS TRACK
              <span className="bg-yellow-400/20 text-yellow-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-yellow-400/30 uppercase">
                Driver Portal
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Live GPS Broadcast Controller
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>GPS Online</span>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-black text-sm shadow">
              {driverName.charAt(0)}
            </div>
            <div className="text-left hidden md:block">
              <div className="font-extrabold text-xs text-white">{driverName}</div>
              <div className="text-[10px] text-slate-400 font-medium">{busNumber} Driver</div>
            </div>
          </div>

          <Link
            href="/login"
            className="p-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
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
          <div className="bg-emerald-500 text-slate-950 px-4 py-3 rounded-2xl font-black text-sm flex items-center justify-between shadow-xl animate-bounce">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              <span>Broadcast Sent: {alertSent}</span>
            </div>
            <span className="text-xs font-bold uppercase opacity-80">Students Notified</span>
          </div>
        )}

        {/* Assigned Vehicle & Active Route Info Banner */}
        <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700/80 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center font-black shadow-lg">
                <Bus className="w-8 h-8 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-yellow-400 font-bold uppercase tracking-wider">Assigned Bus</span>
                  <span className="bg-slate-700 text-slate-300 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                    REGISTERED
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{busNumber}</h1>
                <p className="text-xs sm:text-sm text-slate-300 font-medium flex items-center gap-1.5 mt-0.5">
                  <Route className="w-4 h-4 text-yellow-400 shrink-0" />
                  {routeName}
                </p>
              </div>
            </div>

            {/* Live Trip Badge */}
            <div className="flex items-center gap-3">
              {tripState === "On Route" ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-5 py-2.5 rounded-2xl flex items-center gap-2 font-black text-sm shadow-inner">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span>TRIP ACTIVE & BROADCASTING</span>
                </div>
              ) : tripState === "Completed" ? (
                <div className="bg-slate-700 border border-slate-600 text-slate-300 px-5 py-2.5 rounded-2xl font-black text-sm">
                  TRIP COMPLETED
                </div>
              ) : (
                <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-5 py-2.5 rounded-2xl font-black text-sm">
                  STANDBY - READY TO START
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MAXIMIZED TRIP CONTROLS (GIANT BUTTONS) */}
        <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-yellow-400" />
              Main Trip Controls
            </h2>
            <span className="text-xs text-slate-400 font-semibold">Touch-friendly large controls</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* GIANT START TRIP BUTTON */}
            <button
              onClick={handleStartTrip}
              className={`w-full py-7 px-8 rounded-3xl font-black text-xl sm:text-2xl transition-all transform active:scale-95 flex items-center justify-center gap-4 shadow-2xl ${
                tripState === "On Route"
                  ? "bg-emerald-500 text-white shadow-emerald-500/30 ring-4 ring-emerald-400/40"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <Play className="w-7 h-7 fill-current text-white" />
              </div>
              <div className="text-left">
                <div>START TRIP</div>
                <div className="text-xs font-bold opacity-80 font-normal">Begin Live GPS Broadcasting</div>
              </div>
            </button>

            {/* GIANT END TRIP BUTTON */}
            <button
              onClick={handleEndTrip}
              className={`w-full py-7 px-8 rounded-3xl font-black text-xl sm:text-2xl transition-all transform active:scale-95 flex items-center justify-center gap-4 shadow-2xl ${
                tripState === "Completed"
                  ? "bg-rose-600 text-white shadow-rose-600/30 ring-4 ring-rose-400/40"
                  : "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <Square className="w-7 h-7 fill-current text-white" />
              </div>
              <div className="text-left">
                <div>END TRIP</div>
                <div className="text-xs font-bold opacity-80 font-normal">Finish & Stop Telemetry</div>
              </div>
            </button>

          </div>
        </div>

        {/* MAXIMIZED TELEMETRY & LIVE DRIVER METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* CARD 1: LIVE SPEED */}
          <div className="bg-slate-800/90 rounded-3xl p-5 border border-slate-700/80 shadow-lg flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Speed</span>
              <Gauge className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1">
                {speed}
                <span className="text-base font-bold text-yellow-400">km/h</span>
              </div>
              <div className="text-xs text-slate-400 font-semibold mt-1 flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                14 GPS Satellites Locked
              </div>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-yellow-400 h-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (speed / 60) * 100)}%` }}
              />
            </div>
          </div>

          {/* CARD 2: NEXT BUS STOP & ETA */}
          <div className="bg-slate-800/90 rounded-3xl p-5 border border-slate-700/80 shadow-lg flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Bus Stop</span>
              <MapPin className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-xl font-black text-white truncate">{activeStop}</div>
              <div className="text-3xl font-black text-emerald-400 mt-1 flex items-center gap-1.5">
                <Clock className="w-6 h-6" />
                {eta}
              </div>
            </div>
            <button
              onClick={() => triggerQuickAlert(`Arrived at ${activeStop}`)}
              className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition"
            >
              Announce Arrival
            </button>
          </div>

          {/* CARD 3: PASSENGER ONBOARD COUNTER */}
          <div className="bg-slate-800/90 rounded-3xl p-5 border border-slate-700/80 shadow-lg flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Passengers Onboard</span>
              <Users className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1">
                {passengers}
                <span className="text-base font-extrabold text-slate-400">/ 55</span>
              </div>
              <div className="text-xs text-slate-400 font-semibold mt-1">
                13 Empty Seats Available
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPassengers(p => Math.max(0, p - 1))}
                className="flex-1 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-black flex items-center justify-center gap-1"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPassengers(p => Math.min(55, p + 1))}
                className="flex-1 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CARD 4: DRIVER SAFETY & STATUS */}
          <div className="bg-slate-800/90 rounded-3xl p-5 border border-slate-700/80 shadow-lg flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vehicle System</span>
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-xl font-black text-emerald-400">OPTIMAL</div>
              <div className="text-xs text-slate-300 font-medium mt-1">
                Engine: Normal Temp • Brakes: Good • Fuel: 85%
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-mono bg-slate-900 p-2 rounded-xl border border-slate-700/50">
              Broadcasting on /topic/bus-locations
            </div>
          </div>

        </div>

        {/* QUICK BROADCAST ACTION CONTROLS */}
        <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700/80 shadow-xl space-y-4">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-yellow-400" />
            Quick Driver Broadcast Alerts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => triggerQuickAlert("Traffic Delay (+5 min)")}
              className="p-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-extrabold text-sm flex items-center gap-3 transition text-left"
            >
              <Clock className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <div>Traffic Delay (+5 min)</div>
                <div className="text-[11px] text-amber-400/80 font-normal">Notify delayed ETA</div>
              </div>
            </button>

            <button
              onClick={() => triggerQuickAlert("Bus Fully Occupied")}
              className="p-4 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 font-extrabold text-sm flex items-center gap-3 transition text-left"
            >
              <Users className="w-6 h-6 text-sky-400 shrink-0" />
              <div>
                <div>Bus Full Alert</div>
                <div className="text-[11px] text-sky-400/80 font-normal">Notify full capacity</div>
              </div>
            </button>

            <button
              onClick={() => triggerQuickAlert("EMERGENCY ASSISTANCE REQUESTED")}
              className="p-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-extrabold text-sm flex items-center gap-3 transition text-left"
            >
              <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
              <div>
                <div>Emergency SOS Broadcast</div>
                <div className="text-[11px] text-rose-400/80 font-normal">Alert transport admin</div>
              </div>
            </button>
          </div>
        </div>

      </main>

    </div>
  );
}
