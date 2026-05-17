import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      line_items: body.items,

      mode: "payment",

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,

      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,

    });

    return NextResponse.json({
      url: session.url,
    });

  } catch (error) {

    return NextResponse.json(
      {
        error: "Stripe checkout failed",
      },
      {
        status: 500,
      }
    );

  }

}