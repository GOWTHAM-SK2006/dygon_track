"use client";

import React, { useState } from "react";
import Link from "next/link";
import InteractiveMap from "@/components/InteractiveMap";
import { 
  Bus, 
  Map, 
  Route, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Menu,
  X,
  UserCheck, 
  TrendingUp, 
  ArrowUpRight
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const recentActivities = [
    {
      id: 1,
      title: "Bus TN-07-AB-1234",
      subtitle: "Started trip on Main Campus Route",
      time: "2 min ago",
      iconColor: "bg-emerald-500 text-white",
    },
    {
      id: 2,
      title: "New student registered",
      subtitle: "arun.k@college.edu",
      time: "12 min ago",
      iconColor: "bg-blue-500 text-white",
    },
    {
      id: 3,
      title: "Route updated",
      subtitle: "Main Campus Route schedule revised",
      time: "25 min ago",
      iconColor: "bg-amber-500 text-white",
    },
    {
      id: 4,
      title: "Driver checked in",
      subtitle: "Ramesh K for Shift 01",
      time: "40 min ago",
      iconColor: "bg-purple-500 text-white",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-800">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-64 bg-slate-950 text-white flex-col justify-between shrink-0 p-5 border-r border-slate-800">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-8 px-2">
            <div className="w-9 h-9 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-extrabold shadow-md">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-sm tracking-tight">DYGON</h2>
              <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider">Admin Portal</p>
            </div>
          </Link>

          <nav className="space-y-1.5">
            {[
              { name: "Dashboard", icon: Bus },
              { name: "Live Map", icon: Map },
              { name: "Buses", icon: Route },
              { name: "Routes", icon: TrendingUp },
              { name: "Users", icon: Users },
              { name: "Reports", icon: FileText },
              { name: "Settings", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-yellow-400 text-slate-950 shadow-md shadow-yellow-400/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900 transition mt-6"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Logout</span>
        </Link>
      </aside>

      {/* MOBILE DRAWER MODAL */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex">
          <div className="w-72 bg-slate-950 text-white p-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-extrabold">
                    <Bus className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-sm text-white">DYGON Admin</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-2">
                {[
                  { name: "Dashboard", icon: Bus },
                  { name: "Live Map", icon: Map },
                  { name: "Buses", icon: Route },
                  { name: "Routes", icon: TrendingUp },
                  { name: "Users", icon: Users },
                  { name: "Reports", icon: FileText },
                  { name: "Settings", icon: Settings },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveTab(item.name);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-yellow-400 text-slate-950"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-rose-400"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-y-auto min-w-0">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Input */}
            <div className="relative w-48 sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:border-yellow-400 focus:bg-white outline-none transition"
              />
            </div>
          </div>

          {/* Right Profile & Notifications */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-yellow-400 ring-2 ring-white" />
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900 text-yellow-400 flex items-center justify-center font-bold text-xs shadow">
                A
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-extrabold text-xs text-slate-900">Admin</div>
                <div className="text-[10px] text-slate-500 font-medium">System Administrator</div>
              </div>
            </div>
          </div>

        </header>

        {/* Dashboard Body Container */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          
          {/* Welcome Headline */}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Welcome back, Admin! 👋
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Here&apos;s what&apos;s happening with your transport system today.
            </p>
          </div>

          {/* 4 Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Total Buses</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">15</h3>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Bus className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Active Buses</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">12</h3>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Bus className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Total Students</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">5,230</h3>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Users className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Active Drivers</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">28</h3>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <UserCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>
          </div>

          {/* Main Content Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            <div className="lg:col-span-8 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Live Bus Map</h3>
                  <p className="text-xs text-slate-500">Real-time GPS bus tracking across campus</p>
                </div>
                <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                  View Full Map <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <InteractiveMap theme="light" />
            </div>

            <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivities.map((act) => (
                    <div key={act.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${act.iconColor}`}>
                        <Bus className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{act.title}</h4>
                        <p className="text-[11px] text-slate-500 truncate">{act.subtitle}</p>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full mt-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition">
                View All Activity Logs
              </button>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
