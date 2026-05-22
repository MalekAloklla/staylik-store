"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { ShoppingBag } from "lucide-react";

export default function ShopPage() {

  const [products, setProducts] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<any>({});

const [cart, setCart] = useState<any[]>([]);
const addToCart = (item: any) => {

  const size = selectedSizes[item.id];

  if (!size) {
    alert("Please select a size");
    return;
  }

  const updatedCart = [
    ...cart,
    {
      ...item,
      selectedSize: size,
      quantity: 1,
    },
  ];

  setCart(updatedCart);

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  alert(`${item.name} (${size}) added to cart`);

};
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
useEffect(() => {

  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    setCart(JSON.parse(savedCart));
  }

}, []);
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/40 border-b border-white/5">

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-6">

          <a
            href="/cart"
            className="text-xl md:text-2xl font-black tracking-[4px] text-[#d8cdbd]"
          >
            STAYLIK
          </a>

          {/* SEARCH */}
          <div className="flex-1 max-w-2xl">

            <div className="bg-[#151515] border border-white/10 rounded-full px-5 py-3">

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full text-sm placeholder:text-white/30"
              />

            </div>

          </div>

          <a href="/" className="relative">

  {cart.length > 0 && (

    <span className="absolute -top-2 -right-2 bg-[#d8cdbd] text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
      {cart.length}
    </span>

  )}

            <ShoppingBag className="text-[#d8cdbd]" />

          </a>

        </div>

      </nav>

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-12 pb-10">

        <p className="uppercase tracking-[5px] text-[#d8cdbd] text-xs mb-4">
          Staylik Collection
        </p>

        <h1 className="text-3xl md:text-5xl font-black">
          Shop All Products
        </h1>

      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

          {filteredProducts.map((item) => (

            <a
  key={item.id}
  href={`/product/${item.id}`}
>
  <motion.div
              whileHover={{
                y: -4,
              }}
              className="bg-[#151515] rounded-[18px] overflow-hidden border border-white/5 hover:border-[#d8cdbd20] transition duration-300"
            >

              {/* IMAGE */}
              <div className="h-[220px] overflow-hidden bg-black">

                <img
                  src={item.image}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />

              </div>

              {/* INFO */}
              <div className="p-4">

                <h2 className="text-sm md:text-base font-semibold line-clamp-2 min-h-[45px]">
                  {item.name}
                </h2>

                <div className="flex items-center gap-1 text-[#d8cdbd] text-sm mt-3">
                  ★★★★★
                </div>
<div className="flex gap-2 mt-4 mb-4">

  {["S", "M", "L", "XL"].map((size) => (

   <button
  key={size}
  onClick={() =>
    setSelectedSizes({
      ...selectedSizes,
      [item.id]: size,
    })
  }
  className={`px-3 py-1 rounded-full border transition text-xs ${
    selectedSizes[item.id] === size
      ? "bg-[#d8cdbd] text-black border-[#d8cdbd]"
      : "border-white/10 bg-white/5 hover:bg-[#d8cdbd] hover:text-black"
  }`}
>
  {size}
</button>

  ))}

</div>
                <div className="mt-3 flex items-center justify-between">

                  <span className="text-[#d8cdbd] text-sm md:text-base font-bold">
                    {item.price}
                  </span>

                  <button
  onClick={() => addToCart(item)}
  className="bg-[#d8cdbd] text-black text-xs px-4 py-2 rounded-full font-semibold hover:scale-105 transition">
  Buy
</button>

                </div>

              </div>

            </motion.div>
</a>
          ))}

        </div>

      </section>

    </main>
  );
}