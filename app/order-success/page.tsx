"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-6">

      <div className="bg-[#151515] border border-white/5 rounded-[35px] p-10 max-w-xl w-full text-center">

        <div className="flex justify-center mb-6">
          <CheckCircle
            size={70}
            className="text-[#d8cdbd]"
          />
        </div>

        <p className="uppercase tracking-[6px] text-[#d8cdbd] text-xs mb-4">
          Order Success
        </p>

        <h1 className="text-4xl font-black mb-5">
          Payment Proof Uploaded
        </h1>

        <p className="text-white/50 leading-8 mb-8">
          Your payment proof was received successfully.
          Your order is now under review and will be confirmed shortly.
        </p>

        <div className="bg-black/30 rounded-[25px] p-6 mb-8">

          <div className="flex justify-between mb-3">
            <span className="text-white/50">
              Status
            </span>

            <span className="bg-yellow-500/20 text-yellow-400 px-4 py-1 rounded-full text-sm">
              Pending
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/50">
              Next Step
            </span>

            <span className="text-[#d8cdbd]">
              Waiting confirmation
            </span>
          </div>

        </div>

        <Link
          href="/"
          className="w-full block bg-[#d8cdbd] text-black py-4 rounded-full font-bold hover:scale-[1.02] transition"
        >
          Back To Store
        </Link>

      </div>

    </main>
  );
}