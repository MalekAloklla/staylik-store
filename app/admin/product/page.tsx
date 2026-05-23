"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ProductPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
const [uploading, setUploading] = useState(false);
const [sizes, setSizes] = useState("");
const [colors, setColors] = useState("");
  const handleAddProduct = async (e: any) => {
    e.preventDefault();

    setUploading(true);

if (!images) return;

const uploadedImages: string[] = [];

for (const file of Array.from(images)) {

  const fileExt = file.name.split(".").pop();

  const fileName =
    `${Date.now()}-${Math.random()}.${fileExt}`;

  await supabase.storage
    .from("products")
    .upload(fileName, file);

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  uploadedImages.push(data.publicUrl);

}

const { error } = await supabase
  .from("products")
  .insert([
    {
      name,
      price: `$${price}`,
      image: uploadedImages[0],
images: uploadedImages,
sizes: sizes.split(","),
colors: colors.split(","),
    },
  ]);

setUploading(false);

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
  placeholder="Sizes ex: S,M,L,XL"
  value={sizes}
  onChange={(e) => setSizes(e.target.value)}
  className="w-full bg-black border border-white/10 rounded-xl p-4"
/>
<input
  type="text"
  placeholder="Colors ex: Black,White,Beige,Red"
  value={colors}
  onChange={(e) => setColors(e.target.value)}
  className="w-full bg-black border border-white/10 rounded-xl p-4"
/>
  <input
  type="file"
  multiple
  onChange={(e) => setImages(e.target.files)}
  className="w-full bg-black border border-white/10 rounded-xl p-4"
/>

        <button
          type="submit"
          className="w-full bg-[#d8cdbd] text-black font-bold py-4 rounded-xl"
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>

      </form>

    </main>
  );
}