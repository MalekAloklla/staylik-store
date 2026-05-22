"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {

  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {

    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);

  }, []);

  const updateQuantity = (
    index: number,
    type: "increase" | "decrease"
  ) => {

    const updatedCart = [...cart];

    if (type === "increase") {

      updatedCart[index].quantity += 1;

    } else {

      if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity -= 1;
      }

    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  const removeItem = (index: number) => {

    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  const subtotal = cart.reduce((total, item) => {

    const price = Number(
      item.price.replace("$", "")
    );

    return total + price * item.quantity;

  }, 0);

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white px-6 py-14">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-12">

          <div>

            <p className="uppercase tracking-[5px] text-[#d8cdbd] text-xs mb-3">
              Your Cart
            </p>

            <h1 className="text-5xl font-black">
              Shopping Cart
            </h1>

          </div>

          <Link
            href="/shop"
            className="text-white/60 hover:text-[#d8cdbd] transition"
          >
            Continue Shopping
          </Link>

        </div>

        {cart.length === 0 ? (

          <div className="bg-[#151515] border border-white/5 rounded-[32px] p-16 text-center">

            <h2 className="text-3xl font-black mb-4">
              Your cart is empty
            </h2>

            <p className="text-white/50 mb-8">
              Add products to continue shopping.
            </p>

            <Link
              href="/shop"
              className="bg-[#d8cdbd] text-black px-8 py-4 rounded-full font-bold"
            >
              Go Shopping
            </Link>

          </div>

        ) : (

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">

            {/* CART ITEMS */}
            <div className="space-y-5">

              {cart.map((item, index) => (

                <div
                  key={index}
                  className="bg-[#151515] border border-white/5 rounded-[28px] p-5 flex flex-col md:flex-row gap-5"
                >

                  <img
                    src={item.image}
                    className="w-full md:w-[170px] h-[170px] object-cover rounded-2xl"
                  />

                  <div className="flex-1 flex flex-col justify-between">

                    <div>

                      <h2 className="text-2xl font-black mb-3">
                        {item.name}
                      </h2>

                      <p className="text-[#d8cdbd] font-bold text-xl mb-2">
                        {item.price}
                      </p>

                      <p className="text-white/50">
                        Size: {item.selectedSize}
                      </p>

                    </div>

                    <div className="flex items-center justify-between mt-6">

                      {/* QUANTITY */}
                      <div className="flex items-center gap-3 bg-black rounded-full px-3 py-2">

                        <button
                          onClick={() =>
                            updateQuantity(index, "decrease")
                          }
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                          -
                        </button>

                        <span className="font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(index, "increase")
                          }
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                          +
                        </button>

                      </div>

                      {/* REMOVE */}
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* SUMMARY */}
            <div className="bg-[#151515] border border-white/5 rounded-[32px] p-8 h-fit sticky top-10">

              <h2 className="text-3xl font-black mb-10">
                Order Summary
              </h2>

              <div className="space-y-5 mb-10">

                <div className="flex items-center justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-white/60">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="border-t border-white/10 pt-5 flex items-center justify-between text-2xl font-black">
                  <span>Total</span>
                  <span className="text-[#d8cdbd]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

              </div>

              <Link
                href="/checkout"
                className="block w-full text-center bg-[#d8cdbd] text-black py-5 rounded-full font-black text-lg hover:scale-[1.02] transition"
              >
                Proceed To Checkout
              </Link>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}