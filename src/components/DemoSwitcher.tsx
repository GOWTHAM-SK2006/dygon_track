"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Bus, 
  LayoutDashboard, 
  LogIn, 
  ShieldAlert, 
  Users, 
  UserCheck, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from "lucide-react";

export default function DemoSwitcher() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navLinks = [
    { name: "Landing Page", href: "/", icon: Bus },
    { name: "Login", href: "/login", icon: LogIn },
    { name: "Admin Dashboard", href: "/dashboard/admin", icon: ShieldAlert },
    { name: "Staff Dashboard", href: "/dashboard/staff", icon: LayoutDashboard },
    { name: "Student Portal", href: "/dashboard/student", icon: Users },
    { name: "Driver Portal", href: "/dashboard/driver", icon: UserCheck },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-2 bg-slate-900/90 text-white backdrop-blur-md border-b border-slate-800 shadow-lg text-xs transition-all duration-300 print:hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-yellow-400 text-slate-950 font-black flex items-center justify-center text-[10px]">
            D
          </div>
          <span className="font-semibold text-yellow-400 tracking-wide flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
            DYGON BUS TRACK Demo Navigator
          </span>
        </div>

        {!collapsed && (
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-yellow-400 text-slate-950 font-bold shadow-md shadow-yellow-400/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">{link.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
          title={collapsed ? "Expand Quick Nav" : "Hide Quick Nav"}
        >
          {collapsed ? (
            <>
              <span className="hidden sm:inline font-mono">View Pages</span>
              <ChevronDown className="w-4 h-4" />
            </>
          ) : (
            <>
              <span className="hidden sm:inline font-mono">Minimize</span>
              <ChevronUp className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
