"use client";

import React, { useState, useEffect } from "react";
import { Bus, MapPin, Navigation, Compass, Layers, RefreshCw, ZoomIn, ZoomOut } from "lucide-react";
import { createGpsWebSocketClient } from "@/lib/websocket";

interface BusData {
  id: string;
  number: string;
  driver: string;
  route: string;
  status: "On Route" | "Idle" | "Delayed";
  eta: string;
  nextStop: string;
  speed: string;
  x: number; // Percentage on map X
  y: number; // Percentage on map Y
}

const initialBuses: BusData[] = [
  {
    id: "1",
    number: "TN64 J 3332",
    driver: "Ramesh K",
    route: "Main Campus Route",
    status: "On Route",
    eta: "2 min",
    nextStop: "Main Gate",
    speed: "35 km/h",
    x: 28,
    y: 35,
  },
  {
    id: "2",
    number: "TN-07-CD-5678",
    driver: "Suresh P",
    route: "City Express Route",
    status: "On Route",
    eta: "12 min",
    nextStop: "CSE Block",
    speed: "42 km/h",
    x: 55,
    y: 45,
  },
  {
    id: "3",
    number: "TN-07-EF-9012",
    driver: "Karthik R",
    route: "Hostel Shuttle",
    status: "Idle",
    eta: "—",
    nextStop: "Depot",
    speed: "0 km/h",
    x: 75,
    y: 70,
  },
  {
    id: "4",
    number: "TN-07-GH-3456",
    driver: "Venkatesh M",
    route: "Library Circular",
    status: "Delayed",
    eta: "18 min",
    nextStop: "Library North",
    speed: "18 km/h",
    x: 42,
    y: 65,
  },
];

const stops = [
  { name: "Main Gate", x: 22, y: 30, code: "ST-01" },
  { name: "CSE Block", x: 60, y: 38, code: "ST-02" },
  { name: "Library", x: 45, y: 72, code: "ST-03" },
  { name: "Hostel Zone", x: 80, y: 65, code: "ST-04" },
  { name: "Sports Complex", x: 30, y: 80, code: "ST-05" },
];

export default function InteractiveMap({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [buses, setBuses] = useState<BusData[]>(initialBuses);
  const [selectedBus, setSelectedBus] = useState<BusData | null>(initialBuses[0]);
  const [filter, setFilter] = useState<"All" | "On Route" | "Idle" | "Delayed">("All");

  // Connect to Spring Boot WebSocket STOMP real-time GPS stream
  useEffect(() => {
    let wsClient: any = null;
    try {
      wsClient = createGpsWebSocketClient((update) => {
        setBuses((prevBuses) =>
          prevBuses.map((bus) => {
            if (bus.number === update.busNumber) {
              const dx = (Math.random() - 0.48) * 1.5;
              const dy = (Math.random() - 0.48) * 1.5;
              return {
                ...bus,
                speed: update.speed ? `${update.speed} km/h` : bus.speed,
                status: update.status === "ON_ROUTE" ? "On Route" : update.status === "DELAYED" ? "Delayed" : "Idle",
                x: Math.max(15, Math.min(85, bus.x + dx)),
                y: Math.max(15, Math.min(85, bus.y + dy)),
              };
            }
            return bus;
          })
        );
      });
      wsClient.activate();
    } catch (e) {
      console.warn("WebSocket client connection error:", e);
    }

    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => {
          if (bus.status === "Idle") return bus;
          const dx = (Math.random() - 0.48) * 1.2;
          const dy = (Math.random() - 0.48) * 1.2;
          return {
            ...bus,
            x: Math.max(15, Math.min(85, bus.x + dx)),
            y: Math.max(15, Math.min(85, bus.y + dy)),
          };
        })
      );
    }, 2500);

    return () => {
      clearInterval(interval);
      if (wsClient && wsClient.deactivate) {
        wsClient.deactivate();
      }
    };
  }, []);

  const filteredBuses = buses.filter(
    (b) => filter === "All" || b.status === filter
  );

  const isDark = theme === "dark";

  return (
    <div
      className={`relative w-full h-[420px] rounded-2xl overflow-hidden border ${
        isDark
          ? "bg-slate-900 border-slate-800 text-slate-100"
          : "bg-slate-100 border-slate-200 text-slate-800"
      } shadow-inner flex flex-col`}
    >
      {/* Map Control Bar */}
      <div
        className={`absolute top-4 left-4 z-20 flex items-center gap-2 p-1.5 rounded-xl border backdrop-blur-md ${
          isDark
            ? "bg-slate-900/80 border-slate-700 text-slate-200"
            : "bg-white/90 border-slate-200 text-slate-700"
        } shadow-sm`}
      >
        <span className="text-xs font-semibold px-2 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-yellow-500" />
          Filter:
        </span>
        {(["All", "On Route", "Idle", "Delayed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              filter === f
                ? "bg-yellow-400 text-slate-950 font-semibold shadow"
                : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div
        className={`absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-xl border backdrop-blur-md ${
          isDark
            ? "bg-slate-900/80 border-slate-700 text-slate-200"
            : "bg-white/90 border-slate-200 text-slate-700"
        } shadow-sm`}
      >
        <button
          onClick={() => setBuses(initialBuses)}
          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          title="Reset View"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition">
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* SVG Map Background */}
      <div className="relative w-full h-full overflow-hidden select-none">
        <svg className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Campus Water body/Park area */}
          <path
            d="M 10 10 Q 120 40, 200 120 T 400 180"
            fill="none"
            stroke={isDark ? "#1E293B" : "#E2E8F0"}
            strokeWidth="30"
            strokeLinecap="round"
          />

          {/* Road Network Lines */}
          <path
            d="M 22% 30% L 60% 38% L 80% 65% L 45% 72% L 30% 80% Z"
            fill="none"
            stroke={isDark ? "#334155" : "#CBD5E1"}
            strokeWidth="14"
            strokeLinejoin="round"
          />
          <path
            d="M 22% 30% L 60% 38% L 80% 65% L 45% 72% L 30% 80% Z"
            fill="none"
            stroke={isDark ? "#475569" : "#FFFFFF"}
            strokeWidth="8"
            strokeDasharray="12 8"
            strokeLinejoin="round"
          />

          {/* Secondary road connector */}
          <path
            d="M 22% 30% L 45% 72%"
            fill="none"
            stroke={isDark ? "#334155" : "#CBD5E1"}
            strokeWidth="10"
          />
        </svg>

        {/* Render Bus Stop Markers */}
        {stops.map((stop) => (
          <div
            key={stop.code}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 cursor-pointer"
            style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
          >
            <div className="flex items-center gap-1.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md hover:scale-105 transition-transform">
              <MapPin className="w-3 h-3 text-yellow-300" />
              <span>{stop.name}</span>
            </div>
          </div>
        ))}

        {/* Render Moving Bus Markers */}
        {filteredBuses.map((bus) => {
          const isSelected = selectedBus?.id === bus.id;
          const statusColor =
            bus.status === "On Route"
              ? "bg-emerald-500"
              : bus.status === "Delayed"
              ? "bg-rose-500"
              : "bg-amber-500";

          return (
            <div
              key={bus.id}
              onClick={() => setSelectedBus(bus)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer transition-all duration-700 ease-out"
              style={{ left: `${bus.x}%`, top: `${bus.y}%` }}
            >
              {/* Bus Pin container */}
              <div className="relative group">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                    isSelected
                      ? "bg-yellow-400 text-slate-950 scale-125 ring-4 ring-yellow-400/40"
                      : "bg-slate-900 text-yellow-400 hover:scale-110 border-2 border-yellow-400"
                  }`}
                >
                  <Bus className="w-5 h-5" />
                  <span
                    className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${statusColor} ring-2 ring-white`}
                  />
                </div>

                {/* Badge Label below pin */}
                <div
                  className={`mt-1 whitespace-nowrap text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm text-center ${
                    isDark
                      ? "bg-slate-800/90 text-slate-200 border border-slate-700"
                      : "bg-white/95 text-slate-800 border border-slate-200"
                  }`}
                >
                  {bus.number}
                </div>
              </div>
            </div>
          );
        })}

        {/* Active Selected Bus Card Overlay */}
        {selectedBus && (
          <div
            className={`absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-40 sm:w-80 p-3.5 rounded-2xl border backdrop-blur-md shadow-2xl transition-all ${
              isDark
                ? "bg-slate-900/95 border-slate-700 text-white"
                : "bg-white/95 border-slate-200 text-slate-900"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-bold">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight">{selectedBus.number}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedBus.route}</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  selectedBus.status === "On Route"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                    : selectedBus.status === "Delayed"
                    ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                }`}
              >
                ● {selectedBus.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-center text-xs">
              <div>
                <span className="block text-[10px] text-slate-400">Next Stop</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {selectedBus.nextStop}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400">ETA</span>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  {selectedBus.eta}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400">Speed</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {selectedBus.speed}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
