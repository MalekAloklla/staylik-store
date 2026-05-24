"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
export default function CheckoutPage() {

  const [cart, setCart] = useState<any[]>([]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
const router = useRouter();
  useEffect(() => {

    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);

  }, []);

  const subtotal = cart.reduce((total, item) => {

    const price = Number(
      item.price
.replace("د.إ","")
.replace("$","")
    );

    return total + price * item.quantity;

  }, 0);
  const shipping = 30;

const total = subtotal + shipping;

  const placeOrder = async () => {

  if (!fullName || !phone || !address) {
    alert("Please complete all fields");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  for (const item of cart) {

    const { data, error } = await supabase
.from("orders")
.insert([
{
    full_name: fullName,
    phone,
    customer_email: email,
    message,
    address,

    product_name: item.name,
    amount: item.price,

    size: item.size,
    color: item.color,
    product_image: item.image,

    status: "Pending",
},
]);

console.log(error);

  }

  localStorage.removeItem("cart");

  setShowSuccessModal(true);

};

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white px-6 py-14">
{showSuccessModal && (

<div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">

<div className="bg-[#151515] border border-white/10 rounded-[35px] p-10 w-[500px] max-w-[90%]">

<p className="text-[#d8cdbd] uppercase tracking-[5px] text-xs mb-4">
Payment
</p>

<h2 className="text-3xl font-black mb-6">
✅ Order Placed Successfully
</h2>

<div className="space-y-4 mb-8">

<div className="bg-black/30 rounded-[20px] p-4">
<p className="text-white/40 text-sm">
Bank Name
</p>
<p className="font-semibold">
First Abu Dhabi Bank (FAB)
</p>
</div>

<div className="bg-black/30 rounded-[20px] p-4">
<p className="text-white/40 text-sm">
Account Holder
</p>
<p className="font-semibold">
MALEK ANAS AL OKLA
</p>
</div>

<div className="bg-black/30 rounded-[20px] p-4">
<p className="text-white/40 text-sm">
IBAN
</p>
<p className="font-semibold">
AE25 0355 6400 1307 6688 773
</p>
</div>

<div className="bg-black/30 rounded-[20px] p-4">
<p className="text-white/40 text-sm">
Account Holder
</p>
<p className="font-semibold">
Staylik Store
</p>
</div>

</div>

<p className="text-white/50 text-sm mb-8">
Please transfer the amount and keep payment proof.
</p>

<button
onClick={() => {
localStorage.removeItem("cart");
router.push("/");
}}
className="w-full bg-[#d8cdbd] text-black py-4 rounded-full font-bold"
>
Done
</button>

</div>

</div>

)}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-10">

        {/* LEFT */}
        <div>

          <p className="uppercase tracking-[5px] text-[#d8cdbd] text-xs mb-4">
            Checkout
          </p>

          <h1 className="text-5xl font-black mb-12">
            Complete Your Order
          </h1>

          <div className="space-y-6">

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#151515] border border-white/10 rounded-2xl p-5 outline-none"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#151515] border border-white/10 rounded-2xl p-5 outline-none"
            />
<input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full bg-[#151515] border border-white/10 rounded-2xl p-5 outline-none"
/>
            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-40 bg-[#151515] border border-white/10 rounded-2xl p-5 outline-none resize-none"
            />
<textarea
  placeholder="Order Notes (Optional)"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  className="w-full h-32 bg-[#151515] border border-white/10 rounded-2xl p-5 outline-none resize-none"
/>
          </div>

          {/* PAYMENT */}
          <div className="mt-14 bg-[#151515] border border-white/5 rounded-[32px] p-8">

            <h2 className="text-3xl font-black mb-8">
              Payment Method
            </h2>

            <div className="space-y-5 text-white/70 leading-8">

              <div className="bg-black rounded-2xl p-6 border border-white/10">

                <p className="text-[#d8cdbd] font-bold mb-4">
                  Bank Transfer
                </p>

                <div className="space-y-2 text-sm">

                  <p>
                    Bank: First Abu Dhabi Bank (FAB)
                  </p>

                  <p>
                    Name: MALEK ANAS AL OKLA
                  </p>

                  <p>
                    IBAN: AE25 0355 6400 1307 6688 773
                  </p>

                </div>

              </div>

              <p className="text-white/50 text-sm">
                After payment, send the transfer receipt to our WhatsApp or Instagram.
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-[#151515] border border-white/5 rounded-[32px] p-8 h-fit sticky top-10">

          <h2 className="text-3xl font-black mb-10">
            Order Summary
          </h2>

          <div className="space-y-5 mb-10">

            {cart.map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-4"
              >

                <img
                  src={item.image}
                  className="w-20 h-20 object-cover rounded-2xl"
                />

                <div className="flex-1">

                  <h3 className="font-bold">
                    {item.name}
                  </h3>

                </div>

                <div className="text-[#d8cdbd] font-bold flex items-center gap-1">

  <img
    src="/dirham.png"
    className="w-4 h-4"
  />

  <span>{item.price.replace("د.إ ", "")}</span>

</div>
<p className="text-white/50">
  Size: {item.size}
</p>

<p className="text-white/50">
  Color: {item.color}
</p>
              </div>

            ))}

          </div>
<div className="flex items-center justify-between text-white/60 mb-4">
  <span>Subtotal</span>
  <div className="flex items-center gap-1">
  <img src="/dirham.png" className="w-4 h-4" />
  <span>{subtotal.toFixed(2)}</span>
</div>
</div>

<div className="flex items-center justify-between text-white/60 mb-6">
  <span>Shipping</span>

  <div className="flex items-center gap-1">
    <img src="/dirham.png" className="w-4 h-4" />
    <span>30.00</span>
  </div>
</div>
          <div className="border-t border-white/10 pt-6 flex items-center justify-between text-2xl font-black mb-10">

            <span>Total</span>

            <div className="text-[#d8cdbd] flex items-center gap-1">
  <img src="/dirham.png" className="w-5 h-5" />
  <span>{total.toFixed(2)}</span>
</div>

          </div>

          <button
            onClick={placeOrder}
            className="w-full bg-[#d8cdbd] text-black py-5 rounded-full font-black text-lg hover:scale-[1.02] transition"
          >
            Place Order
          </button>

        </div>

      </div>

    </main>
  );
}