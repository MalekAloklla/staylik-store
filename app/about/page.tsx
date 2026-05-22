"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {

  return (

    <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-24">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto"
      >

        <div className="flex flex-col items-center text-center">

          <Image
            src="/logo.png"
            alt="Staylik"
            width={220}
            height={220}
            className="rounded-3xl shadow-2xl mb-10"
          />

          <h1 className="text-5xl font-black mb-6">
            About Staylik
          </h1>

          <p className="text-white/60 leading-9 text-lg max-w-3xl">

            Staylik is a luxury streetwear brand built for people
            who value confidence, identity, and premium fashion.

            Our mission is to combine minimalist luxury with modern
            oversized aesthetics to create timeless pieces that
            elevate everyday style.

          </p>

        </div>

      </motion.div>

    </main>

  );

}