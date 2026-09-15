"use client";

import React from "react";
import Link from "next/link";
import { 
  Bus, 
  GraduationCap, 
  UserCheck, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  MapPin, 
  Clock, 
  Building2, 
  CheckCircle2,
  Sparkles,
  Share2
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Top Header Navigation */}
      <header className="w-full border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md shadow-yellow-400/30 group-hover:scale-105 transition-transform">
              <Bus className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  DYGON BUS TRACK
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                Smart College Transport System
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/" className="text-slate-900 font-semibold hover:text-yellow-600 transition">
              Home
            </Link>
            <a href="#about" className="hover:text-slate-900 transition">
              About
            </a>
            <a href="#features" className="hover:text-slate-900 transition">
              Features
            </a>
            <a href="#contact" className="hover:text-slate-900 transition">
              Contact
            </a>
          </nav>

          {/* Action Sign In */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-sm shadow-md shadow-yellow-400/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Hero */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-amber-50/40 via-white to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Text */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-100 border border-yellow-300/60 text-yellow-900 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
                  Smart Campus Mobility
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  Real-Time College <br />
                  Bus Tracking <br />
                  <span className="text-yellow-500 underline decoration-yellow-300 underline-offset-8">
                    Made Simple.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                  Track your college buses, find stops, view routes and stay connected with campus transportation seamlessly from any device.
                </p>

                {/* Hero CTA buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#portals"
                    className="px-7 py-3.5 rounded-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-base shadow-lg shadow-yellow-400/30 flex items-center gap-2 transition-all hover:scale-105"
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </a>

                  <Link
                    href="/login"
                    className="px-6 py-3.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold text-base shadow-sm flex items-center gap-2 hover:bg-slate-50 transition"
                  >
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-yellow-400 flex items-center justify-center">
                      <Play className="w-3 h-3 fill-yellow-400 ml-0.5" />
                    </div>
                    Watch Demo
                  </Link>
                </div>

                {/* Stat pills summary */}
                <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
                      <Bus className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-slate-900">15+</div>
                      <div className="text-xs text-slate-500 font-medium">Buses</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-slate-900">50+</div>
                      <div className="text-xs text-slate-500 font-medium">Stops</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-slate-900">5000+</div>
                      <div className="text-xs text-slate-500 font-medium">Students</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-slate-900">4</div>
                      <div className="text-xs text-slate-500 font-medium">Campuses</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Bus Photo */}
              <div className="lg:col-span-6 relative flex items-center justify-center">
                <div className="relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white group">
                  <img
                    src="/bus.png"
                    alt="Sairam Institutions College Bus TN64 J 3332"
                    className="w-full h-auto object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Portals Selection Section */}
        <section id="portals" className="py-20 bg-slate-50 border-t border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Choose Your Portal
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                Select the portal that matches your role and get started.
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Student Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-yellow-300 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center mb-6 shadow-md shadow-yellow-400/30 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Student</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    Track your college bus, check arrival times, find nearby stops and view your schedule.
                  </p>
                </div>
                <Link
                  href="/login?role=student"
                  className="w-full py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-sm shadow flex items-center justify-center gap-2 transition"
                >
                  Student Portal <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Driver Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-yellow-300 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center mb-6 shadow-md shadow-yellow-400/30 group-hover:scale-110 transition-transform">
                    <Bus className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Driver</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    Manage your assigned bus, view your route and update your trip status.
                  </p>
                </div>
                <Link
                  href="/login?role=driver"
                  className="w-full py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-sm shadow flex items-center justify-center gap-2 transition"
                >
                  Driver Portal <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Staff Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-yellow-300 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center mb-6 shadow-md shadow-yellow-400/30 group-hover:scale-110 transition-transform">
                    <UserCheck className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Staff</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    Monitor campus transportation, buses, routes and student transport operations.
                  </p>
                </div>
                <Link
                  href="/login?role=staff"
                  className="w-full py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-sm shadow flex items-center justify-center gap-2 transition"
                >
                  Staff Portal <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Admin Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-yellow-300 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center mb-6 shadow-md shadow-yellow-400/30 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Admin</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    Manage the complete transport system, buses, routes, users and operations.
                  </p>
                </div>
                <Link
                  href="/login?role=admin"
                  className="w-full py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-sm shadow flex items-center justify-center gap-2 transition"
                >
                  Admin Portal <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white border-t border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-bold">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base">DYGON BUS TRACK</span>
                <p className="text-xs text-slate-400">Smart College Transport System</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <a href="#privacy" className="hover:text-white transition">Privacy</a>
              <a href="#terms" className="hover:text-white transition">Terms</a>
              <a href="#contact" className="hover:text-white transition">Contact</a>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="hover:text-yellow-400 transition" title="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="hover:text-yellow-400 transition" title="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" className="hover:text-yellow-400 transition" title="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <span className="text-xs text-slate-500 font-mono pl-4 border-l border-slate-800">
                © 2026 DYGON BUS TRACK. All rights reserved.
              </span>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
