"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const login = async () => {

  const { data, error } =
  await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log(data);
  console.log(error);

  if (error) {
    alert(error.message);
    return;
  }

  router.push("/admin");

};

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-[30px] p-8">

        <h1 className="text-4xl font-black text-white mb-10">
          Admin Login
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0b0b0b] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0b0b0b] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
          />

          <button
            onClick={login}
            className="w-full bg-[#d8cdbd] text-black py-4 rounded-2xl font-bold hover:scale-[1.02] transition"
          >

            Login

          </button>

        </div>

      </div>

    </main>
  );
}