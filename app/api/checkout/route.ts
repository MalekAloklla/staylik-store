import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {

  try {

    const { items } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    const { data, error } = await supabase
  .from("orders")
  .insert(
    items.map((item: any) => ({
      customer_email: "customer",
      product_name: item.price_data.product_data.name,
      product_image: item.price_data.product_data.images[0],
      amount: `$${item.price_data.unit_amount / 100}`,
      status: "Paid",
    }))
  );

console.log(data);

if (error) {
  console.log(error);
  return NextResponse.json(
    { error: error.message },
    { status: 500 }
  );
}

console.log(session.url);

return NextResponse.json({
  url: session.url
});

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );

  }
}