"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white p-10">

      <Link
        href="/admin"
        className="flex items-center gap-2 text-white/60 hover:text-[#d8cdbd] transition mb-10"
      >
        <ArrowLeft size={18} />
        Back Dashboard
      </Link>

      <p className="uppercase tracking-[6px] text-[#d8cdbd] text-xs mb-4">
        Analytics
      </p>

      <h1 className="text-5xl font-black mb-10">
        Store Analytics
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-[#151515] border border-white/5 rounded-[30px] p-8">
          <p className="text-white/40 mb-3">Revenue</p>
          <h2 className="text-4xl font-black">$0</h2>
        </div>

        <div className="bg-[#151515] border border-white/5 rounded-[30px] p-8">
          <p className="text-white/40 mb-3">Orders</p>
          <h2 className="text-4xl font-black">0</h2>
        </div>

        <div className="bg-[#151515] border border-white/5 rounded-[30px] p-8">
          <p className="text-white/40 mb-3">Customers</p>
          <h2 className="text-4xl font-black">0</h2>
        </div>

      </div>

    </main>
  );
}