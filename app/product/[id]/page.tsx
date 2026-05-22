"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {

  const params = useParams();

  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState("");

  const fetchProduct = async () => {

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single();

    if (data) {
      setProduct(data);
    }

  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const addToCart = () => {

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    cart.push({
      ...product,
      selectedSize,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");

  };

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white px-6 py-16">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-start">

        {/* IMAGE */}
        <div className="bg-[#151515] rounded-[32px] overflow-hidden">

          <img
            src={product.image}
            className="w-full h-[700px] object-cover"
          />

        </div>

        {/* INFO */}
        <div>

          <p className="uppercase tracking-[5px] text-[#d8cdbd] text-xs mb-4">
            STAYLIK
          </p>

          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            {product.name}
          </h1>

          <div className="flex items-center gap-1 text-[#d8cdbd] text-lg mb-8">
            ★★★★★
          </div>

          <p className="text-3xl font-black text-[#d8cdbd] mb-10">
            {product.price}
          </p>

          {/* SIZES */}
          <div className="mb-10">

            <p className="text-sm text-white/50 mb-4">
              Select Size
            </p>

            <div className="flex gap-3">

              {["S", "M", "L", "XL"].map((size) => (

                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-3 rounded-full border transition ${
                    selectedSize === size
                      ? "bg-[#d8cdbd] text-black border-[#d8cdbd]"
                      : "border-white/10 bg-white/5 hover:bg-[#d8cdbd] hover:text-black"
                  }`}
                >
                  {size}
                </button>

              ))}

            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={addToCart}
            className="w-full bg-[#d8cdbd] text-black py-5 rounded-full font-black text-lg hover:scale-[1.02] transition"
          >
            Add To Cart
          </button>

          {/* DESCRIPTION */}
          <div className="mt-14 space-y-6 text-white/60 leading-8">

            <p>
              Premium quality oversized streetwear designed for modern fashion culture.
            </p>

            <p>
              Crafted with attention to comfort, fit, and minimal luxury aesthetics.
            </p>

            <p>
              UAE shipping only.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}