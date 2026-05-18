"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ProductPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleAddProduct = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase
      .from("products")
      .insert([
        {
          name,
          price: `$${price}`,
          image,
        },
      ]);

    if (!error) {
      router.push("/admin");
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center p-10">

      <form
        onSubmit={handleAddProduct}
        className="w-full max-w-xl bg-[#151515] border border-white/5 rounded-[30px] p-10 space-y-6"
      >

        <h1 className="text-4xl font-black">
          Add Product
        </h1>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl p-4"
        />

        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl p-4"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl p-4"
        />

        <button
          type="submit"
          className="w-full bg-[#d8cdbd] text-black font-bold py-4 rounded-xl"
        >
          Add Product
        </button>

      </form>

    </main>
  );
}