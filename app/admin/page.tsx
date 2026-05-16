"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus, LogOut, Upload } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<any[]>([]);

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);

  // CHECK AUTH
  const checkAuth = async () => {

    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      router.push("/login");
      return;
    }

    setLoading(false);

  };

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }

  };

  useEffect(() => {

    checkAuth();

    fetchProducts();

  }, []);

  // ADD PRODUCT
  const addProduct = async () => {

    if (!name || !price || !imageFile) {
      toast.error("Fill all fields");
      return;
    }

    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, imageFile);

    if (uploadError) {
      toast.error("Image upload failed");
      return;
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${fileName}`;

    const { error } = await supabase
      .from("products")
      .insert([
        {
          name,
          price,
          image: imageUrl,
        },
      ]);

    if (!error) {

      toast.success("Product Added");

      setName("");
      setPrice("");
      setImageFile(null);

      fetchProducts();

    }

  };

  // DELETE PRODUCT
  const deleteProduct = async (id: number) => {

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (!error) {

      toast.success("Product Deleted");

      fetchProducts();

    }

  };

  // LOGOUT
  const logout = async () => {

    await supabase.auth.signOut();

    router.push("/login");

  };

  if (loading) {

    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white text-2xl font-bold">
        Loading...
      </main>
    );

  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white p-8">

      <Toaster />

      <div className="max-w-6xl mx-auto">

        <div className="mb-16 flex items-center justify-between gap-6">

          <div>

            <p className="uppercase tracking-[6px] text-[#d8cdbd] text-sm mb-4">
              Staylik Dashboard
            </p>

            <h1 className="text-6xl font-black">
              Admin Panel
            </h1>

          </div>

          <button
            onClick={logout}
            className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl flex items-center gap-3 hover:bg-red-500/20 transition"
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

        {/* ADD PRODUCT */}
        <div className="bg-[#151515] border border-white/5 rounded-[30px] p-8 mb-12">

          <h2 className="text-3xl font-bold mb-8">
            Add Product
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <label className="bg-[#0f0f0f] border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3 cursor-pointer hover:border-[#d8cdbd50] transition">

              <Upload size={20} />

              Upload Image

              <input
                type="file"
                hidden
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
              />

            </label>

            <button
              onClick={addProduct}
              className="bg-[#d8cdbd] text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition"
            >

              <Plus size={20} />

              Add Product

            </button>

          </div>

        </div>

        {/* PRODUCTS */}
        <div className="bg-[#151515] border border-white/5 rounded-[30px] p-8">

          <h2 className="text-3xl font-bold mb-8">
            Products
          </h2>

          <div className="space-y-5">

            {products.map((product) => (

              <div
                key={product.id}
                className="bg-[#0f0f0f] border border-white/5 rounded-2xl px-6 py-5 flex items-center justify-between"
              >

                <div className="flex items-center gap-5">

                  <img
                    src={product.image}
                    className="w-20 h-20 object-cover rounded-2xl"
                  />

                  <div>

                    <h3 className="text-xl font-bold">
                      {product.name}
                    </h3>

                    <p className="text-[#d8cdbd] mt-1">
                      {product.price}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="text-red-400 hover:text-red-300 transition"
                >

                  <Trash2 />

                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}