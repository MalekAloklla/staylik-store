"use client";

import { motion } from "framer-motion";

export default function ContactPage() {

  return (

    <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-24">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto"
      >

        <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-2xl">

          <h1 className="text-5xl font-black mb-10">
            Contact Us
          </h1>

          <div className="space-y-8 text-white/70 text-lg">

            <div>

  <p className="text-white font-semibold mb-2">
    Instagram
  </p>

  <p>@stayilkstore</p>

</div>

<div>

  <p className="text-white font-semibold mb-2">
    TikTok
  </p>

  <p>@stayilkstore</p>

</div>

            <div>
              <p className="text-white font-semibold mb-2">
                Email
                
              </p>

              <p>stylikstore.info@gmail.com</p>
            </div>
<div className="mt-10">

  <h3 className="text-white text-2xl font-bold mb-4">
    Phone
  </h3>

  <div className="space-y-3 text-white/60 text-lg">

    <a
      href="tel:+971555059115"
      className="block hover:text-[#d8cdbd] transition"
    >
      +971 55 505 9115
    </a>

    <a
      href="tel:+971553537787"
      className="block hover:text-[#d8cdbd] transition"
    >
      +971 55 353 7787
    </a>

  </div>

</div>
            <div>
              <p className="text-white font-semibold mb-2">
                Support
              </p>

              <p>
                For orders, sizing, shipping, or collaborations,
                feel free to contact us anytime.
              </p>
            </div>

          </div>

        </div>

      </motion.div>

    </main>

  );

}