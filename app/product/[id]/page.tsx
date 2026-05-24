"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {

  const params = useParams();

  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
const [selectedColor, setSelectedColor] = useState("");
const [showAdded, setShowAdded] = useState(false);
  const fetchProduct = async () => {

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single();

    if (data) {
      setProduct(data);
      if (data?.images?.length > 0) {
  setSelectedImage(data.images[0]);
}
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
if (!selectedColor) {
  alert("Please select a color");
  return;
}
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingItem = cart.find(
(item: any) =>
  item.id === product.id &&
  item.size === selectedSize &&
  item.color === selectedColor
);

if (existingItem) {

  existingItem.quantity += 1;

} else {

  cart.push({
  ...product,
  size: selectedSize,
  color: selectedColor,
  quantity: 1,
});

}

    localStorage.setItem("cart", JSON.stringify(cart));

    setShowAdded(true);
    setTimeout(() => {
  setShowAdded(false);
}, 2500);

  };

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

return (

<>

{showAdded && (

<div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">

<div className="bg-[#151515] border border-[#d8cdbd]/20 px-8 py-4 rounded-[20px] shadow-xl">

<p className="text-[#d8cdbd] font-semibold">
✓ Added to cart successfully
</p>

</div>

</div>

)}

    <main className="min-h-screen bg-[#0b0b0b] text-white px-6 py-16">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-start">

        {/* IMAGE */}
        <div>
        <div className="bg-[#151515] rounded-[32px] overflow-hidden">

          <img
            src={selectedImage || product.image}
            className="w-full h-[700px] object-cover"
          />

        </div>

<div className="flex gap-4 mt-5 flex-wrap">

  {product.images?.map((img: string, index: number) => (

    <button
      key={index}
      onClick={() => setSelectedImage(img)}
      className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition ${
        selectedImage === img
          ? "border-[#d8cdbd]"
          : "border-white/10"
      }`}
    >

      <img
        src={img}
        className="w-full h-full object-cover"
      />

    </button>

  ))}
</div>
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

          <div className="flex items-center gap-2 mb-10">
  <img
    src="/dirham.png"
    className="w-6 h-6"
  />

  <p className="text-3xl font-black text-[#d8cdbd]">
    {product.price.replace("د.إ", "")}
  </p>
</div>
<div className="mt-10">

  <p className="text-white/50 mb-4">
    Select Size
  </p>

  <div className="flex gap-3 flex-wrap">

    {product.sizes?.map((size: string, index: number) => (

      <button
        key={index}
        onClick={() => setSelectedSize(size)}
        className={`px-6 py-3 rounded-full border transition ${
          selectedSize === size
            ? "bg-[#d8cdbd] text-black border-[#d8cdbd]"
            : "border-white/10 text-white"
        }`}
      >

        {size}

      </button>

    ))}

  </div>

</div>
<div className="mt-8">

  <p className="text-white/50 mb-4">
    Select Color
  </p>

  <div className="flex gap-3 flex-wrap mb-8">

    {product.colors?.map((color: string, index: number) => (

      <button
        key={index}
        onClick={() => setSelectedColor(color)}
        className={`px-6 py-3 rounded-full border transition ${
          selectedColor === color
            ? "bg-[#d8cdbd] text-black border-[#d8cdbd]"
            : "border-white/10 text-white"
        }`}
      >
        {color}
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

</>

);
}