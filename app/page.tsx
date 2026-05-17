"use client";

import "./i18n";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";

export default function Home() {

  const { t, i18n } = useTranslation();

  const [cartOpen, setCartOpen] = useState(false);

  const [cart, setCart] = useState<string[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [selectedSize, setSelectedSize] = useState("M");

  const [products, setProducts] = useState<any[]>([]);

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product: any) => {
  setCart([...cart, product]);
};
const checkout = async () => {

  const items = cart.map((item: any) => ({
  price_data: {
    currency: "usd",
    product_data: {
      name: item.name,
      images: [item.image],
    },
    unit_amount: item.price * 100,
  },
  quantity: 1,
}));

  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  });

  const data = await res.json();

  window.location.href = data.url;

};
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <main
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#0b0b0b] text-white overflow-hidden"
    >

      {/* GLOW */}
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#d8cdbd10] blur-[140px] rounded-full"></div>

      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#b8955d10] blur-[140px] rounded-full"></div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-black/30 border-b border-white/5">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-5">

          {/* LOGO */}
          <h1 className="text-xl md:text-2xl font-black tracking-[5px] text-[#d8cdbd]">
            STAYLIK
          </h1>

          {/* LINKS */}
          <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-[2px] text-white/70">

            <a
              href="/"
              className="hover:text-[#d8cdbd] transition"
            >
              Home
            </a>

            <a
              href="/shop"
              className="hover:text-[#d8cdbd] transition"
            >
              Shop
            </a>

            <button className="hover:text-[#d8cdbd] transition">
              About
            </button>

            <button className="hover:text-[#d8cdbd] transition">
              Contact
            </button>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* LANGUAGE */}
            <div className="flex gap-2">

              <button
                onClick={() => i18n.changeLanguage("en")}
                className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold hover:scale-105 transition"
              >
                EN
              </button>

              <button
                onClick={() => i18n.changeLanguage("ar")}
                className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold hover:scale-105 transition"
              >
                AR
              </button>

            </div>

            {/* CART */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative hover:scale-105 transition"
            >

              <ShoppingBag className="text-[#d8cdbd]" />

              <span className="absolute -top-2 -right-2 bg-[#d8cdbd] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">

                {cart.length}

              </span>

            </button>

          </div>

        </div>

      </nav>

      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-32 overflow-hidden bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: "url('/introstyle.png')",
          backgroundPosition: "center top",
        }}
      >

        <div className="absolute inset-0 bg-black/75"></div>

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-3xl"
        >

          <p className="uppercase tracking-[8px] text-[#d8cdbd] text-xs mb-5">
            {t("luxury")}
          </p>

          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            {t("welcome")}
          </h2>

          <p className="mt-6 text-white/60 text-sm md:text-base leading-7">
            {t("premium")}
          </p>

        </motion.div>

      </section>

      {/* FEATURED PRODUCTS */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 md:px-10 pb-28 pt-10"
      >

        <div className="text-center mb-14">

          <p className="uppercase tracking-[6px] text-[#d8cdbd] text-xs mb-4">
            Featured Collection
          </p>

          <h3 className="text-3xl md:text-5xl font-black">
            {t("featured")}
          </h3>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {products.slice(0, 3).map((item) => (

            <motion.div
              key={item.id}
              whileHover={{
                y: -8,
                scale: 1.01,
              }}
              onClick={() => {
                setSelectedProduct(item);
                setSelectedSize("M");
              }}
              className="group bg-[#151515] rounded-[24px] overflow-hidden border border-white/5 hover:border-[#d8cdbd20] transition duration-500 cursor-pointer"
            >

              <div className="h-[320px] overflow-hidden">

                <img
                  src={item.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

              </div>

              <div className="p-5">

                <h4 className="text-lg font-bold">
                  {item.name}
                </h4>

                <div className="flex items-center justify-between mt-5">

                  <span className="text-[#d8cdbd] text-base font-bold">
                    {item.price}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="bg-[#d8cdbd] text-black px-4 py-2 rounded-full text-sm hover:scale-105 transition"
                  >

                    {t("buy")}

                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </motion.section>

      {/* ABOUT */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pb-28 text-center">

        <p className="uppercase tracking-[6px] text-[#d8cdbd] text-xs mb-4">
          About Staylik
        </p>

        <h3 className="text-3xl md:text-5xl font-black leading-tight mb-8">
          Minimal Luxury Streetwear
        </h3>

        <p className="text-white/60 leading-8 text-sm md:text-base">
          STAYLIK blends premium quality with modern luxury aesthetics.
          Every piece is designed for people who want clean, timeless,
          and elevated streetwear.
        </p>

      </section>

      {/* INSTAGRAM */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 md:px-10 pb-28"
      >

        <div className="text-center mb-14">

          <p className="uppercase tracking-[6px] text-[#d8cdbd] text-xs mb-4">
            {t("community")}
          </p>

          <h3 className="text-3xl md:text-5xl font-black">
            {t("instagram")}
          </h3>

        </div>

        <div className="grid md:grid-cols-4 gap-5">

          {[
            "/hoodie1.jpg",
            "/hoodie2.jpg",
            "/hoodie3.jpg",
            "/introstyle.png",
          ].map((image, index) => (

            <motion.div
              whileHover={{ scale: 1.02 }}
              key={index}
              className="overflow-hidden rounded-[28px] group relative"
            >

              <img
                src={image}
                className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">

                <span className="text-[#d8cdbd] text-base font-semibold tracking-[3px]">
                  @stayilkstore
                </span>

              </div>

            </motion.div>

          ))}

        </div>

      </motion.section>

      {/* REVIEWS */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 md:px-10 pb-28"
      >

        <div className="text-center mb-14">

          <h3 className="text-3xl md:text-5xl font-black">
            {t("reviews")}
          </h3>

        </div>

        <div className="grid md:grid-cols-3 gap-7">

          {[
            t("review1"),
            t("review2"),
            t("review3")
          ].map((review, index) => (

            <motion.div
              whileHover={{ y: -8 }}
              key={index}
              className="bg-[#151515] border border-white/5 rounded-[24px] p-8"
            >

              <div className="text-[#d8cdbd] text-xl mb-5">
                ★★★★★
              </div>

              <p className="text-white/70 leading-7">
                {review}
              </p>

            </motion.div>

          ))}

        </div>

      </motion.section>

      {/* FOOTER */}
<footer className="border-t border-white/10 mt-24 bg-black">

  <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-4 gap-12">

    {/* BRAND */}
    <div>

      <h2 className="text-3xl font-black tracking-[6px] text-[#d8cdbd] mb-6">
        STAYLIK
      </h2>

      <p className="text-white/50 leading-7 text-sm">
        Luxury streetwear crafted for modern fashion lovers.
        Premium quality with timeless aesthetics.
      </p>

    </div>

    {/* LINKS */}
    <div>

      <h3 className="text-white text-lg font-bold mb-6">
        INFO
      </h3>

      <div className="flex flex-col gap-4 text-white/60 text-sm">

        <a href="#" className="hover:text-[#d8cdbd] transition">
          Shipping & Delivery
        </a>

        <a href="#" className="hover:text-[#d8cdbd] transition">
          Returns & Refunds
        </a>

        <a href="#" className="hover:text-[#d8cdbd] transition">
          Privacy Policy
        </a>

        <a href="#" className="hover:text-[#d8cdbd] transition">
          Contact Us
        </a>

      </div>

    </div>

    {/* SOCIAL */}
    <div>

      <h3 className="text-white text-lg font-bold mb-6">
        FOLLOW US
      </h3>

      <div className="flex gap-5 text-white/70 text-3xl">

        <a
          href="https://instagram.com/stayilkstore"
          target="_blank"
          className="hover:text-[#d8cdbd] transition"
        >
          Instagram
        </a>

      </div>

    </div>

    {/* NEWSLETTER */}
    <div>

      <h3 className="text-white text-lg font-bold mb-6">
        NEWSLETTER
      </h3>

      <p className="text-white/50 text-sm mb-5">
        Get updates about new drops and exclusive offers.
      </p>

      <div className="flex overflow-hidden rounded-full border border-white/10">

        <input
          type="email"
          placeholder="Email"
          className="bg-transparent px-5 py-4 w-full outline-none text-sm"
        />

        <button className="bg-[#d8cdbd] text-black px-6 font-bold">
          JOIN
        </button>

      </div>

    </div>

  </div>

  {/* BOTTOM */}
  <div className="border-t border-white/10 py-6 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">

    <span>
      © 2026 STAYLIK. All rights reserved.
    </span>

    <div className="flex gap-4">

      <span>Visa</span>
      <span>Mastercard</span>
      <span>PayPal</span>
      <span>Apple Pay</span>

    </div>

  </div>

</footer>

      {/* PRODUCT POPUP */}
      <AnimatePresence>

        {selectedProduct && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998] flex items-center justify-center p-6"
          >

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-[#111] rounded-[40px] overflow-hidden max-w-5xl w-full grid md:grid-cols-2"
            >

              <img
                src={selectedProduct.image}
                className="w-full h-full object-cover"
              />

              <div className="p-10 relative">

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6"
                >

                  <X />

                </button>

                <h2 className="text-4xl font-black mb-6">
                  {selectedProduct.name}
                </h2>

                <p className="text-white/60 mb-8 leading-7">
                  {t("popupdesc")}
                </p>

                <div className="flex gap-4 mb-10">

                  {["S", "M", "L", "XL"].map((size) => (

                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-3 rounded-full border transition ${
                        selectedSize === size
                          ? "bg-[#d8cdbd] text-black border-[#d8cdbd]"
                          : "border-white/10 hover:bg-[#d8cdbd] hover:text-black"
                      }`}
                    >

                      {size}

                    </button>

                  ))}

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-[#d8cdbd] text-3xl font-black">
                    {selectedProduct.price}
                  </span>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct.name);
                      setSelectedProduct(null);
                    }}
                    className="bg-[#d8cdbd] text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition"
                  >

                    {t("addtocart")}

                  </button>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* CART */}
      <AnimatePresence>

        {cartOpen && (

          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="fixed top-0 right-0 w-[380px] h-screen bg-[#111] border-l border-white/10 z-[9999] p-8 overflow-y-auto"
          >

            <div className="flex items-center justify-between mb-10">

              <h2 className="text-2xl font-black">
                {t("cart")}
              </h2>

              <button onClick={() => setCartOpen(false)}>
                <X />
              </button>

            </div>

            <div className="space-y-4">

              {cart.length === 0 ? (

                <p className="text-white/50">
                  {t("empty")}
                </p>

              ) : (

                cart.map((item, index) => (

                  <div
                    key={index}
                    className="bg-[#1a1a1a] p-4 rounded-2xl border border-white/5"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <span className="text-sm">
                        {item}
                      </span>

                      <button
                        onClick={() => {
                          const updatedCart = cart.filter((_, i) => i !== index);
                          setCart(updatedCart);
                        }}
                        className="text-red-400 hover:text-red-300 transition text-sm"
                      >

                        Remove

                      </button>

                    </div>

                  </div>

                ))

              )}

            </div>

            <div className="mt-10 border-t border-white/10 pt-6">

              <div className="flex items-center justify-between mb-4 text-white/60">

                <span>{t("subtotal")}</span>

                <span>
                  ${cart.length * 90}
                </span>

              </div>

              <div className="flex items-center justify-between mb-6 text-white/60">

                <span>{t("shipping")}</span>

                <span>
                  {cart.length === 0 ? "$0" : "$15"}
                </span>

              </div>

              <div className="flex items-center justify-between text-xl font-black mb-8">

                <span>{t("total")}</span>

                <span className="text-[#d8cdbd]">

                  ${cart.length === 0 ? 0 : cart.length * 90 + 15}

                </span>

              </div>

              {cart.length > 0 && (

                <button
  onClick={checkout}
  className="w-full bg-[#d8cdbd] text-black py-4 rounded-full font-bold hover:scale-[1.02] transition"
>

  {t("checkout")}

</button>

              )}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>
  );
}