"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function OrdersPage() {

  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {

    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setOrders(data);
    }

  };
const updateStatus = async (id: number, status: string) => {

  await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  fetchOrders();

};

const deleteOrder = async (id: number) => {

  const confirmDelete = confirm("Delete this order?");

  if (!confirmDelete) return;

  await supabase
    .from("orders")
    .delete()
    .eq("id", id);

  fetchOrders();

};
  useEffect(() => {

  fetchOrders();

  const interval = setInterval(() => {
    fetchOrders();
  }, 1000);

  return () => clearInterval(interval);

}, []);

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white p-10">

      <Link
        href="/admin"
        className="flex items-center gap-2 text-white/60 hover:text-[#d8cdbd] transition mb-10"
      >
        <ArrowLeft size={18} />
        Back Dashboard
      </Link>

      <p className="uppercase tracking-[6px] text-[#d8cdbd] text-xs mb-4">
        Orders
      </p>

      <h1 className="text-5xl font-black mb-10">
        Orders Management
      </h1>

      <div className="bg-[#151515] border border-white/5 rounded-[30px] overflow-hidden">

        <table className="w-full">

          <thead>
            <tr className="border-b border-white/5 text-left text-white/40">
              <th className="p-6">Product</th>
              <th className="p-6">Amount</th>
              <th className="p-6">Status</th>
              <th className="p-6">Date</th>
<th className="p-6">Actions</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-b border-white/5"
              >

                <td className="p-6">

  <div className="flex items-center gap-4">

    <div>
      <p className="font-semibold">
        {order.product_name}
      </p>
    </div>

  </div>

</td>

                <td className="p-6 text-[#d8cdbd]">
                  {order.amount}
                </td>

                <td className="p-6">

  <span
    className={`px-4 py-2 rounded-full text-sm font-semibold ${
      order.status === "Delivered"
        ? "bg-green-500/20 text-green-400"
        : "bg-yellow-500/20 text-yellow-400"
    }`}
  >
    {order.status}
  </span>

</td>

                <td className="p-6 text-white/40 text-sm">
                  {new Date(order.created_at).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}
                </td>
<td className="p-6">

  <div className="flex gap-3">

    <button
      onClick={() =>
        updateStatus(
          order.id,
          order.status === "Pending"
            ? "Delivered"
            : "Pending"
        )
      }
      className="bg-[#d8cdbd] text-black px-4 py-2 rounded-full text-xs font-bold hover:scale-105 transition"
    >
      {order.status === "Pending"
        ? "Mark Delivered"
        : "Mark Pending"}
    </button>

    <button
      onClick={() => deleteOrder(order.id)}
      className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-xs font-bold hover:bg-red-500/30 transition"
    >
      Delete
    </button>

  </div>

</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}