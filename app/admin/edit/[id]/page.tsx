"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {

  const router = useRouter();
  const params = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const fetchProduct = async () => {

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single();

    if (data) {
      setName(data.name);
      setPrice(data.price.replace("$", ""));
      setImage(data.image);
    }

  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleUpdate = async (e: any) => {

    e.preventDefault();

    await supabase
      .from("products")
      .update({
        name,
        price: `$${price}`,
        image,
      })
      .eq("id", params.id);

    router.push("/admin");

  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center p-10">

      <form
        onSubmit={handleUpdate}
        className="w-full max-w-xl bg-[#151515] border border-white/5 rounded-[30px] p-10 space-y-6"
      >

        <h1 className="text-4xl font-black">
          Edit Product
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
          Save Changes
        </button>

      </form>

    </main>
  );
}