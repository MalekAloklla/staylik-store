"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Home() {

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

  const addToCart = (product: string) => {
    setCart([...cart, `${product} - Size ${selectedSize}`]);
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 80,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white overflow-hidden">

      {/* GLOW */}
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#d8cdbd10] blur-[140px] rounded-full"></div>

      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#b8955d10] blur-[140px] rounded-full"></div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

          <h1 className="text-2xl font-black tracking-[6px] text-[#d8cdbd]">
            STAYLIK
          </h1>

          <button
            onClick={() => setCartOpen(true)}
            className="relative"
          >

            <ShoppingBag className="text-[#d8cdbd]" />

            <span className="absolute -top-2 -right-2 bg-[#d8cdbd] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">

              {cart.length}

            </span>

          </button>

        </div>

      </nav>

      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 pt-52 pb-44 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/introstyle.png')" }}
      >

        <div className="absolute inset-0 bg-black/70"></div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl"
        >

          <p className="uppercase tracking-[10px] text-[#d8cdbd] text-sm mb-6">
            Luxury Streetwear
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-tight">

            ELEVATE
            <span className="block text-[#d8cdbd]">
              YOUR STYLE
            </span>

          </h2>

          <p className="mt-6 text-white/70">
            Premium hoodies crafted for modern streetwear lovers.
          </p>

        </motion.div>

      </section>

      {/* PRODUCTS */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-8 pb-32 pt-20"
      >

        <h3 className="text-5xl font-black mb-14">
          Featured Drops
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          {products.map((item) => (

            <motion.div
              key={item.id}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              onClick={() => {
                setSelectedProduct(item);
                setSelectedSize("M");
              }}
              className="group bg-[#151515] rounded-[30px] overflow-hidden border border-white/5 hover:border-[#d8cdbd30] transition duration-500 cursor-pointer"
            >

              <div className="h-[420px] overflow-hidden">

                <img
                  src={item.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

              </div>

              <div className="p-6">

                <h4 className="text-2xl font-bold">
                  {item.name}
                </h4>

                <div className="flex items-center justify-between mt-6">

                  <span className="text-[#d8cdbd] text-xl font-bold">
                    {item.price}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item.name);
                    }}
                    className="bg-[#d8cdbd] text-black px-5 py-2 rounded-full hover:scale-105 transition"
                  >

                    Buy

                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </motion.section>

      {/* INSTAGRAM */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-8 pb-32"
      >

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-[#d8cdbd] text-sm mb-4">
            Staylik Community
          </p>

          <h3 className="text-5xl font-black">
            Instagram Showcase
          </h3>

        </div>

        <div className="grid md:grid-cols-4 gap-6">

          {[
            "/hoodie1.jpg",
            "/hoodie2.jpg",
            "/hoodie3.jpg",
            "/introstyle.png",
          ].map((image, index) => (

            <motion.div
              whileHover={{ scale: 1.03 }}
              key={index}
              className="overflow-hidden rounded-[30px] group relative"
            >

              <img
                src={image}
                className="w-full h-[350px] object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">

                <span className="text-[#d8cdbd] text-lg font-semibold tracking-[3px]">
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
        className="max-w-7xl mx-auto px-8 pb-32"
      >

        <div className="text-center mb-16">

          <h3 className="text-5xl font-black">
            What People Say
          </h3>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            "Best hoodie quality I’ve ever worn.",
            "Feels like a luxury brand.",
            "People ask me where I bought this from."
          ].map((review, index) => (

            <motion.div
              whileHover={{ y: -8 }}
              key={index}
              className="bg-[#151515] border border-white/5 rounded-[30px] p-8"
            >

              <div className="text-[#d8cdbd] text-xl mb-6">
                ★★★★★
              </div>

              <p className="text-white/70 text-lg">
                {review}
              </p>

            </motion.div>

          ))}

        </div>

      </motion.section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-white/40 text-sm">

        © 2026 STAYLIK — Luxury Streetwear Brand

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

                <h2 className="text-5xl font-black mb-6">
                  {selectedProduct.name}
                </h2>

                <p className="text-white/60 mb-8">
                  Premium oversized hoodie designed for luxury streetwear lovers.
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

                    Add To Cart

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
                Your Cart
              </h2>

              <button onClick={() => setCartOpen(false)}>
                <X />
              </button>

            </div>

            <div className="space-y-4">

              {cart.length === 0 ? (

                <p className="text-white/50">
                  Your cart is empty.
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

            {/* TOTAL */}
            <div className="mt-10 border-t border-white/10 pt-6">

              <div className="flex items-center justify-between mb-4 text-white/60">

                <span>Subtotal</span>

                <span>
                  ${cart.length * 90}
                </span>

              </div>

              <div className="flex items-center justify-between mb-6 text-white/60">

                <span>Shipping</span>

                <span>
                  {cart.length === 0 ? "$0" : "$15"}
                </span>

              </div>

              <div className="flex items-center justify-between text-xl font-black mb-8">

                <span>Total</span>

                <span className="text-[#d8cdbd]">

                  ${cart.length === 0 ? 0 : cart.length * 90 + 15}

                </span>

              </div>

              {cart.length > 0 && (

                <button className="w-full bg-[#d8cdbd] text-black py-4 rounded-full font-bold hover:scale-[1.02] transition">

                  Checkout

                </button>

              )}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>
  );
}