import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {

  try {

    const { items } = await req.json();
console.log(process.env.STRIPE_SECRET_KEY);
console.log(process.env.NEXT_PUBLIC_SITE_URL);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    console.log(session.url);

    return NextResponse.json({
      url: session.url
    });

  } catch (error) {

    console.log("STRIPE ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );

  }

}