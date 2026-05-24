"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function OrdersPage() {

  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
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

  console.log(id);

  const confirmDelete = confirm("Delete this order?");

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", Number(id));

  console.log(error);

  fetchOrders();

};
  useEffect(() => {

  fetchOrders();

  const channel = supabase
    .channel("orders-realtime")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "orders",
      },
      () => {
        fetchOrders();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };

}, []);
const filteredOrders = orders.filter((order) => {

  const matchesSearch =
    order.product_name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    order.full_name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    order.customer_email
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchesFilter =
    filter === "All"
      ? true
      : order.status === filter;

  return matchesSearch && matchesFilter;

});


const totalOrders = orders.length;

const pendingOrders = orders.filter(
(order) => order.status === "Pending"
).length;

const revenue = orders.reduce((total, order) => {

return total + Number(
(order.amount || "$0").replace("$","")
);

},0);

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
<div className="flex justify-between items-center mb-8 gap-4">

<input
  type="text"
  placeholder="Search orders..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="bg-[#151515] border border-white/10 rounded-full px-6 py-3 text-white w-[350px] outline-none"
/>

<div className="flex gap-3">

<button
onClick={() => setFilter("All")}
className={`px-5 py-2 rounded-full ${
filter==="All"
? "bg-[#d8cdbd] text-black"
: "bg-white/10"
}`}
>
All
</button>

<button
onClick={() => setFilter("Pending")}
className={`px-5 py-2 rounded-full ${
filter==="Pending"
? "bg-yellow-500 text-black"
: "bg-white/10"
}`}
>
Pending
</button>

<button
onClick={() => setFilter("Delivered")}
className={`px-5 py-2 rounded-full ${
filter==="Delivered"
? "bg-green-500 text-black"
: "bg-white/10"
}`}
>
Delivered
</button>

</div>

</div>  
      <div className="grid grid-cols-3 gap-6 mb-10">

<div className="bg-[#151515] border border-white/5 rounded-[30px] p-8">
<p className="text-white/40 mb-3">
Total Orders
</p>

<h2 className="text-4xl font-black">
{totalOrders}
</h2>
</div>


<div className="bg-[#151515] border border-white/5 rounded-[30px] p-8">
<p className="text-white/40 mb-3">
Pending Orders
</p>

<h2 className="text-4xl font-black text-yellow-400">
{pendingOrders}
</h2>
</div>


<div className="bg-[#151515] border border-white/5 rounded-[30px] p-8">
<p className="text-white/40 mb-3">
Revenue
</p>

<h2 className="text-4xl font-black text-[#d8cdbd]">
${revenue}
</h2>
</div>

</div>

      <div className="bg-[#151515] border border-white/5 rounded-[30px] overflow-hidden">

        <table className="w-full">

          <thead>
            <tr className="border-b border-white/5 text-left text-white/40">
              <th className="p-6">Product</th>
<th className="p-6">Customer</th>
<th className="p-6">Size</th>
<th className="p-6">Color</th>
<th className="p-6">Amount</th>
<th className="p-6">Status</th>
<th className="p-6">Date</th>
<th className="p-6">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr
key={order.id}
className="border-b border-white/5 cursor-pointer hover:bg-white/5 transition"
onClick={() => setSelectedOrder(order)}
>

                <td className="p-6">

<div className="flex items-center gap-4">

<img
  src={order.product_image}
  className="w-16 h-16 rounded-xl object-cover"
/>

<div>
  <p className="font-semibold">
    {order.product_name}
  </p>
</div>

</div>

</td>
<td className="p-6">

<div>
  <p className="font-semibold">
    {order.full_name}
  </p>

  <p className="text-white/40 text-sm">
    {order.customer_email}
  </p>
</div>

</td>

<td className="p-6 text-[#d8cdbd]">
  {order.size}
</td>

<td className="p-6 text-[#d8cdbd]">
  {order.color}
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
{selectedOrder && (

<div
className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
onClick={() => setSelectedOrder(null)}
>

<div
className="bg-[#151515] w-[700px] rounded-[30px] p-8 border border-white/10"
onClick={(e)=>e.stopPropagation()}
>

<div className="flex justify-between items-center mb-8">

<h2 className="text-3xl font-black">
Order Details
</h2>

<button
onClick={() => setSelectedOrder(null)}
className="text-white/50 hover:text-white"
>
✕
</button>

</div>


<div className="flex gap-6 mb-8">

<img
src={selectedOrder.product_image}
className="w-28 h-28 rounded-2xl object-cover"
/>

<div>

<p className="font-bold text-xl">
{selectedOrder.product_name}
</p>

<p className="text-white/50">
Size: {selectedOrder.size}
</p>

<p className="text-white/50">
Color: {selectedOrder.color}
</p>

<p className="text-[#d8cdbd] mt-2">
{selectedOrder.amount}
</p>

</div>

</div>


<div className="space-y-4">

<p>
<span className="text-white/50">
Customer:
</span>{" "}
{selectedOrder.full_name}
</p>

<p>
<span className="text-white/50">
Email:
</span>{" "}
{selectedOrder.customer_email}
</p>

<p>
<span className="text-white/50">
Phone:
</span>{" "}
{selectedOrder.phone}
</p>

<p>
<span className="text-white/50">
Address:
</span>{" "}
{selectedOrder.address}
</p>

<p>
<span className="text-white/50">
Message:
</span>{" "}
{selectedOrder.message || "-"}
</p>

</div>

</div>

</div>

)}
    </main>
  );
}