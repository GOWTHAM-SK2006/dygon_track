"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import InteractiveMap from "@/components/InteractiveMap";
import { fetchBuses } from "@/lib/api";
import { 
  Bus, 
  MapPin, 
  Calendar, 
  Bell, 
  Navigation, 
  LogOut,
  Route,
  ChevronDown
} from "lucide-react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [studentName, setStudentName] = useState("Gowtham");
  const [busNumber, setBusNumber] = useState("Bus 101");
  const [routeName, setRouteName] = useState("Melmaruvathur - Main Campus");
  const [availableBuses, setAvailableBuses] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dygon_user");
      if (stored) {
        const user = JSON.parse(stored);
        if (user.name) setStudentName(user.name);
        if (user.busNumber) setBusNumber(user.busNumber);
        if (user.routeName) setRouteName(user.routeName);
      }
    } catch (e) {
      console.warn("No session student found, using defaults.", e);
    }

    // Fetch registered buses from Spring Boot API
    fetchBuses().then((data) => {
      if (data && data.length > 0) {
        setAvailableBuses(data);
      }
    });
  }, []);

  const handleSelectBus = (bNo: string) => {
    setBusNumber(bNo);
    const found = availableBuses.find((b) => b.busNumber === bNo);
    if (found && found.routeName) {
      setRouteName(found.routeName);
    }
  };

  const upcomingStops = [
    { name: "Melmaruvathur Junction", time: "2 min", code: "ST-01", status: "Next" },
    { name: "Main Campus Gate", time: "8 min", code: "ST-02", status: "Upcoming" },
    { name: "CSE & IT Block", time: "12 min", code: "ST-03", status: "Upcoming" },
    { name: "Central Library", time: "15 min", code: "ST-04", status: "Upcoming" },
  ];

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
            <span className="text-[10px] text-yellow-600 font-bold ml-1.5 uppercase hidden sm:inline">Student Portal</span>
          </div>
        </Link>

        {/* Bus Selector Pill */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <span className="text-[11px] font-bold text-slate-500 pl-2 hidden sm:inline">Tracking:</span>
          <select
            value={busNumber}
            onChange={(e) => handleSelectBus(e.target.value)}
            className="bg-yellow-400 text-slate-950 font-black text-xs px-3 py-1 rounded-xl outline-none cursor-pointer shadow-xs"
          >
            {availableBuses.length > 0 ? (
              availableBuses.map((b) => (
                <option key={b.busNumber} value={b.busNumber}>
                  {b.busNumber} ({b.driverName || "Driver"})
                </option>
              ))
            ) : (
              <>
                <option value="Bus 101">Bus 101 (Ramesh K)</option>
                <option value="TN64 J 3332">TN64 J 3332 (Suresh P)</option>
                <option value="Bus 102">Bus 102 (Karthik R)</option>
              </>
            )}
          </select>
        </div>

        {/* Right User Actions */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-yellow-400 ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-yellow-400 flex items-center justify-center font-bold text-xs shadow">
              {studentName.charAt(0)}
            </div>
            <div className="text-left hidden sm:block">
              <div className="font-extrabold text-xs text-slate-900">{studentName}</div>
              <div className="text-[10px] text-slate-500 font-medium">CS Student</div>
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

      {/* Main Page Body Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Header Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Good Morning, {studentName}! 👋
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Live tracking for registered <span className="font-extrabold text-slate-900">{busNumber}</span> ({routeName})
            </p>
          </div>

          <span className="self-start sm:self-auto bg-emerald-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            LIVE GPS ACTIVE
          </span>
        </div>

        {/* Responsive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Live Map View */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm space-y-4 order-2 lg:order-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Live Campus Route Map for {busNumber}</h2>
                <p className="text-xs text-slate-500">Real-time GPS location updated by driver</p>
              </div>
            </div>

            {/* Interactive Bus Map */}
            <InteractiveMap theme="light" />
          </div>

          {/* RIGHT COLUMN: Bus Info Card & Route Timeline */}
          <div className="lg:col-span-4 space-y-6 order-1 lg:order-2">
            
            {/* REGISTERED BUS INFO CARD */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-yellow-400/20">
                    <Bus className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Driver Registered Bus</div>
                    <h3 className="font-black text-xl text-slate-900">{busNumber}</h3>
                    <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                      <Route className="w-3.5 h-3.5 text-yellow-600" />
                      {routeName}
                    </p>
                  </div>
                </div>

                <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  LIVE
                </span>
              </div>

              {/* Next Stop & ETA grid */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-semibold">Next Stop</span>
                  <span className="font-extrabold text-slate-800 text-xs">Melmaruvathur</span>
                </div>

                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 text-right">
                  <span className="text-[10px] text-amber-700 block font-semibold">ETA</span>
                  <span className="font-black text-yellow-600 text-sm">2 min</span>
                </div>
              </div>
            </div>

            {/* ROUTE STOPS TIMELINE */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Route Waypoints for {busNumber}</h3>
              <div className="space-y-3">
                {upcomingStops.map((stop, idx) => (
                  <div key={stop.code} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${idx === 0 ? "bg-yellow-400 ring-4 ring-yellow-400/20" : "bg-slate-300"}`} />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{stop.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{stop.code}</span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                      {stop.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Sticky Bottom Tab Bar */}
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
          onClick={() => setActiveTab("Buses")}
          className={`flex flex-col items-center gap-1 font-medium text-[10px] ${
            activeTab === "Buses" ? "text-yellow-600 font-bold" : "text-slate-400"
          }`}
        >
          <Navigation className="w-5 h-5" />
          <span>Buses</span>
        </button>
        <button
          onClick={() => setActiveTab("Stops")}
          className={`flex flex-col items-center gap-1 font-medium text-[10px] ${
            activeTab === "Stops" ? "text-yellow-600 font-bold" : "text-slate-400"
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span>Stops</span>
        </button>
        <button
          onClick={() => setActiveTab("Schedule")}
          className={`flex flex-col items-center gap-1 font-medium text-[10px] ${
            activeTab === "Schedule" ? "text-yellow-600 font-bold" : "text-slate-400"
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Schedule</span>
        </button>
      </div>

    </div>
  );
}
