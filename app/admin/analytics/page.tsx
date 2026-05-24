"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AnalyticsPage() {
  const [orders, setOrders] = useState<any[]>([]);

const fetchOrders = async () => {

  const { data } = await supabase
    .from("orders")
    .select("*");

  if (data) {
    setOrders(data);
  }

};

useEffect(() => {

  fetchOrders();

  const channel = supabase
    .channel("analytics-realtime")
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
const revenue = orders.reduce((total, order) => {

return total + Number(
(order.amount || "0")
.replace("$","")
.replace("د.إ","")
);

},0);

const totalOrders = orders.length;

const totalCustomers = new Set(
orders.map(order => order.customer_email)
).size;

const pendingOrders = orders.filter(
(order) => order.status === "Pending"
).length;

const deliveredOrders = orders.filter(
(order) => order.status === "Delivered"
).length;

const productCounts = orders.reduce((acc, order) => {

acc[order.product_name] =
(acc[order.product_name] || 0) + 1;

return acc;

}, {} as Record<string, number>);

const mostSoldProduct =
Object.keys(productCounts).length > 0
? Object.keys(productCounts).reduce((a,b)=>
productCounts[a] > productCounts[b]
? a
: b
)
: "No products";
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
        Analytics
      </p>

      <h1 className="text-5xl font-black mb-10">
        Store Analytics
      </h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

        <div className="bg-[#151515] border border-white/5 rounded-[30px] p-8">
          <p className="text-white/40 mb-3">Revenue</p>
          <h2 className="text-4xl font-black flex items-center gap-2">
  <img src="/dirham.png" className="w-6 h-6" />
{revenue}
</h2>
        </div>

        <div className="bg-[#151515] border border-white/5 rounded-[30px] p-8">
          <p className="text-white/40 mb-3">Orders</p>
          <h2 className="text-4xl font-black">
{totalOrders}
</h2>
        </div>

        <div className="bg-[#151515] border border-white/5 rounded-[30px] p-8">
          <p className="text-white/40 mb-3">Customers</p>
          <h2 className="text-4xl font-black">
{totalCustomers}
</h2>
        </div>
<div className="bg-[#151515] border border-white/5 rounded-[30px] p-8">

<p className="text-white/40 mb-3">
Pending
</p>

<h2 className="text-4xl font-black text-yellow-400">
{pendingOrders}
</h2>

</div>


<div className="bg-[#151515] border border-white/5 rounded-[30px] p-8">

<p className="text-white/40 mb-3">
Delivered
</p>

<h2 className="text-4xl font-black text-green-400">
{deliveredOrders}
</h2>

</div>


<div className="bg-[#151515] border border-white/5 rounded-[30px] p-8">

<p className="text-white/40 mb-3">
Most Sold
</p>

<h2 className="text-xl font-black text-[#d8cdbd]">
{mostSoldProduct}
</h2>

</div>
      </div>

    </main>
  );
}