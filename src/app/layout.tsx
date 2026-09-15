import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DYGON BUS TRACK - Smart College Transport System",
  description: "Real-Time College Bus Tracking Made Simple. Track your college buses, find stops, view routes and stay connected.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
