"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import InteractiveMap from "@/components/InteractiveMap";
import { startDriverTrip, endDriverTrip } from "@/lib/api";
import { 
  Bus, 
  MapPin, 
  Bell, 
  Play, 
  Square, 
  Navigation, 
  ShieldCheck, 
  LogOut,
  Route
} from "lucide-react";

export default function DriverDashboard() {
  const [tripState, setTripState] = useState<"On Route" | "Not Started" | "Completed">("On Route");
  const [activeTab, setActiveTab] = useState("Dashboard");
  
  const [driverName, setDriverName] = useState("Ramesh K");
  const [busNumber, setBusNumber] = useState("Bus 101");
  const [routeName, setRouteName] = useState("Melmaruvathur - Main Campus");

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

  const handleStartTrip = async () => {
    setTripState("On Route");
    await startDriverTrip(busNumber);
  };

  const handleEndTrip = async () => {
    setTripState("Completed");
    await endDriverTrip(busNumber);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col pb-16 md:pb-6 text-slate-800">
      
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-black shadow-sm">
            <Bus className="w-4 h-4" />
          </div>
          <div>
            <span className="font-black text-sm text-slate-900 tracking-tight">DYGON</span>
            <span className="text-[10px] text-yellow-600 font-bold ml-1.5 uppercase hidden sm:inline">Driver Portal</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-yellow-400 ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-yellow-400 flex items-center justify-center font-bold text-xs shadow">
              {driverName.charAt(0)}
            </div>
            <div className="text-left hidden sm:block">
              <div className="font-extrabold text-xs text-slate-900">{driverName}</div>
              <div className="text-[10px] text-slate-500 font-medium">Assigned Driver</div>
            </div>
          </div>

          <Link
            href="/login"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Header Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Hello, {driverName}! 👋
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Broadcast live GPS data for <span className="font-extrabold text-slate-900">{busNumber}</span> ({routeName})
            </p>
          </div>

          <span className="self-start sm:self-auto bg-emerald-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            TRIP IN PROGRESS
          </span>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Registered Bus & Trip Controls */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* REGISTERED BUS CARD */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Registered Vehicle</div>
                  <h3 className="font-black text-xl text-slate-900 mt-0.5">{busNumber}</h3>
                  <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                    <Route className="w-3.5 h-3.5 text-yellow-600" />
                    {routeName}
                  </p>
                </div>

                <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200">
                  ASSIGNED
                </span>
              </div>

              {/* Bus Visual Banner */}
              <div className="bg-slate-950 rounded-2xl p-4 text-yellow-400 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-bold">
                    <Bus className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{busNumber} Express</div>
                    <div className="text-[10px] text-slate-400 font-mono">GPS Broadcasting • Active</div>
                  </div>
                </div>
              </div>

              {/* Trip Controls */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-bold">Trip Status</span>
                  <span className="font-black text-emerald-600 uppercase text-xs">{tripState}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleStartTrip}
                    className={`py-3 rounded-2xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 shadow-sm ${
                      tripState === "On Route"
                        ? "bg-emerald-500 text-white shadow-emerald-500/20"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Start Trip
                  </button>

                  <button
                    onClick={handleEndTrip}
                    className={`py-3 rounded-2xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 shadow-sm ${
                      tripState === "Completed"
                        ? "bg-rose-600 text-white shadow-rose-600/20"
                        : "bg-rose-500 text-white hover:bg-rose-600"
                    }`}
                  >
                    <Square className="w-4 h-4 fill-current" />
                    End Trip
                  </button>
                </div>
              </div>

              {/* Next Stop & ETA readout */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-semibold">Next Stop</span>
                  <span className="font-extrabold text-slate-800 text-sm">Main Gate</span>
                </div>

                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 text-right">
                  <span className="text-[10px] text-amber-700 block font-semibold">ETA</span>
                  <span className="font-black text-yellow-600 text-sm">2 min</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Route & Map */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Driver Live GPS Broadcasting Map</h2>
                <p className="text-xs text-slate-500">Live navigation map for {busNumber}</p>
              </div>
            </div>

            <InteractiveMap theme="light" />
          </div>

        </div>

      </main>

      {/* Bottom Nav Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-2 grid grid-cols-4 text-center shadow-lg">
        <button
          onClick={() => setActiveTab("Dashboard")}
          className={`flex flex-col items-center gap-1 font-bold text-[10px] ${
            activeTab === "Dashboard" ? "text-yellow-600" : "text-slate-400"
          }`}
        >
          <Bus className="w-5 h-5" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab("Route")}
          className={`flex flex-col items-center gap-1 font-medium text-[10px] ${
            activeTab === "Route" ? "text-yellow-600 font-bold" : "text-slate-400"
          }`}
        >
          <Navigation className="w-5 h-5" />
          <span>Route</span>
        </button>
        <button
          onClick={() => setActiveTab("Map")}
          className={`flex flex-col items-center gap-1 font-medium text-[10px] ${
            activeTab === "Map" ? "text-yellow-600 font-bold" : "text-slate-400"
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span>Map</span>
        </button>
        <button
          onClick={() => setActiveTab("More")}
          className={`flex flex-col items-center gap-1 font-medium text-[10px] ${
            activeTab === "More" ? "text-yellow-600 font-bold" : "text-slate-400"
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span>More</span>
        </button>
      </div>

    </div>
  );
}
