export default function CancelPage() {

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-6 text-center">

      <div>

        <h1 className="text-5xl font-black text-red-400 mb-6">
          Payment Cancelled
        </h1>

        <p className="text-white/60 mb-8">
          Your payment was cancelled.
        </p>

        <a
          href="/"
          className="bg-[#d8cdbd] text-black px-8 py-4 rounded-full font-bold"
        >
          Back Home
        </a>

      </div>

    </main>
  );
}