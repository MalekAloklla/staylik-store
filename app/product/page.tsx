"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      {/* NAV */}
      <div className="max-w-7xl mx-auto px-8 py-8">

        <Link
          href="/"
          className="flex items-center gap-2 text-[#d8cdbd] hover:opacity-70 transition"
        >
          <ArrowLeft size={18} />
          Back to store
        </Link>

      </div>

      {/* PRODUCT SECTION */}
      <section className="max-w-6xl mx-auto px-8 pb-32 grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#151515] rounded-[30px] overflow-hidden border border-white/10"
        >

          <img
            src="/hoodie1.jpg"
            className="w-full h-[500px] object-cover"
          />

        </motion.div>

        {/* DETAILS */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <p className="uppercase tracking-[6px] text-[#d8cdbd] text-sm mb-4">
            STAYLIK DROP
          </p>

          <h1 className="text-5xl font-black mb-6">
            Shadow Hoodie
          </h1>

          <p className="text-white/60 leading-relaxed mb-8">
            Premium oversized hoodie crafted with luxury fabric.
            Designed for streetwear dominance and everyday comfort.
          </p>

          <div className="text-3xl font-bold text-[#d8cdbd] mb-8 flex items-center gap-2">
<img src="/dirham.png" className="w-6 h-6"/>
85
</div>

          {/* SIZES */}
          <div className="mb-8">

            <p className="text-white/50 mb-3">Select Size</p>

            <div className="flex gap-3">

              {["S", "M", "L", "XL"].map((size) => (

                <button
                  key={size}
                  className="px-5 py-2 border border-white/20 rounded-full hover:bg-[#d8cdbd] hover:text-black transition"
                >
                  {size}
                </button>

              ))}

            </div>

          </div>

          {/* BUTTON */}
          <button className="bg-[#d8cdbd] text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition">
            Add to Cart
          </button>

        </motion.div>

      </section>

    </main>
  );
}