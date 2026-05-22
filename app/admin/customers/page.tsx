"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function CustomersPage() {

  const [customers, setCustomers] = useState<any[]>([]);

  const fetchCustomers = async () => {

    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (data) {

      const grouped = data.reduce((acc: any, order: any) => {

        const existing = acc.find(
          (item: any) => item.customer_email === order.customer_email
        );

        if (existing) {

          existing.orders += 1;
          existing.last_order = order.created_at;

        } else {

          acc.push({
            full_name: order.full_name,
            customer_email: order.customer_email,
            phone: order.phone,
            orders: 1,
            last_order: order.created_at,
          });

        }

        return acc;

      }, []);

      setCustomers(grouped);

    }

  };

  useEffect(() => {
    fetchCustomers();
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
        Customers
      </p>

      <h1 className="text-5xl font-black mb-10">
        Customers List
      </h1>

      <div className="bg-[#151515] border border-white/5 rounded-[30px] overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/5 text-left text-white/40">

              <th className="p-6">Customer</th>
              <th className="p-6">Email</th>
              <th className="p-6">Phone</th>
              <th className="p-6">Orders</th>
              <th className="p-6">Last Order</th>

            </tr>

          </thead>

          <tbody>

            {customers.map((customer, index) => (

              <tr
                key={index}
                className="border-b border-white/5"
              >

                <td className="p-6 font-semibold">
                  {customer.full_name}
                </td>

                <td className="p-6 text-white/70">
                  {customer.customer_email}
                </td>

                <td className="p-6 text-white/70">
                  {customer.phone}
                </td>

                <td className="p-6 text-[#d8cdbd] font-bold">
                  {customer.orders}
                </td>

                <td className="p-6 text-white/40 text-sm">
                  {new Date(customer.last_order).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}