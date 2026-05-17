"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {

  const [products, setProducts] = useState<any[]>([]);
const [orders, setOrders] = useState<any[]>([]);
  const fetchProducts = async () => {

    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setProducts(data);
    }
    const { data: ordersData } = await supabase
  .from("orders")
  .select("*");

if (ordersData) {
  setOrders(ordersData);
}

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white flex">

      {/* SIDEBAR */}
      <aside className="w-[260px] border-r border-white/10 bg-black/40 p-8 hidden md:block">

        <h1 className="text-3xl font-black tracking-[6px] text-[#d8cdbd] mb-14">
          STAYLIK
        </h1>

        <div className="space-y-5 text-white/70">

          <Link
            href="/admin"
            className="block w-full text-left hover:text-[#d8cdbd] transition"
          >
            Dashboard
          </Link>

          <Link
            href="/admin"
            className="block w-full text-left hover:text-[#d8cdbd] transition"
          >
            Products
          </Link>

          <Link
            href="/admin/orders"
            className="block w-full text-left hover:text-[#d8cdbd] transition"
          >
            Orders
          </Link>

          <Link
            href="/admin/customers"
            className="block w-full text-left hover:text-[#d8cdbd] transition"
          >
            Customers
          </Link>

          <Link
            href="/admin/analytics"
            className="block w-full text-left hover:text-[#d8cdbd] transition"
          >
            Analytics
          </Link>

        </div>

      </aside>

      {/* CONTENT */}
      <section className="flex-1 p-6 md:p-10 overflow-hidden">

        {/* TOP */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">

          <div>

            <p className="uppercase tracking-[6px] text-[#d8cdbd] text-xs mb-3">
              Admin Dashboard
            </p>

            <h2 className="text-4xl md:text-5xl font-black">
              Welcome Back
            </h2>

          </div>

          <button className="bg-[#d8cdbd] text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition">

            <Plus size={18} />
            Add Product

          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#151515] border border-white/5 rounded-[28px] p-6"
          >

            <Package className="text-[#d8cdbd] mb-5" />

            <p className="text-white/50 text-sm mb-2">
              Total Products
            </p>

            <h3 className="text-4xl font-black">
              {products.length}
            </h3>

          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#151515] border border-white/5 rounded-[28px] p-6"
          >

            <ShoppingCart className="text-[#d8cdbd] mb-5" />

            <p className="text-white/50 text-sm mb-2">
              Orders
            </p>

            <h3 className="text-4xl font-black">
              {orders.length}
              </h3>
          

          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#151515] border border-white/5 rounded-[28px] p-6"
          >

            <DollarSign className="text-[#d8cdbd] mb-5" />

            <p className="text-white/50 text-sm mb-2">
              Revenue
            </p>

            <h3 className="text-4xl font-black">
              $0
            </h3>

          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#151515] border border-white/5 rounded-[28px] p-6"
          >

            <Users className="text-[#d8cdbd] mb-5" />

            <p className="text-white/50 text-sm mb-2">
              Customers
            </p>

            <h3 className="text-4xl font-black">
              0
            </h3>

          </motion.div>

        </div>

        {/* PRODUCTS */}
        <div className="bg-[#151515] border border-white/5 rounded-[30px] overflow-hidden">

          <div className="p-6 border-b border-white/5 flex items-center justify-between">

            <h3 className="text-2xl font-black">
              Products
            </h3>

            <span className="text-white/40 text-sm">
              {products.length} Items
            </span>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="text-left text-white/40 text-sm border-b border-white/5">

                  <th className="p-6">Image</th>
                  <th className="p-6">Name</th>
                  <th className="p-6">Price</th>
                  <th className="p-6">Actions</th>

                </tr>

              </thead>

              <tbody>

                {products.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition"
                  >

                    <td className="p-6">

                      <img
                        src={item.image}
                        className="w-20 h-20 object-cover rounded-2xl"
                      />

                    </td>

                    <td className="p-6 font-semibold">
                      {item.name}
                    </td>

                    <td className="p-6 text-[#d8cdbd] font-bold">
                      {item.price}
                    </td>

                    <td className="p-6">

                      <div className="flex gap-3">

                        <button className="bg-white/10 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition">
                          Edit
                        </button>

                        <button className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm hover:bg-red-500/30 transition">
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

            </section>

    </main>
  );
}