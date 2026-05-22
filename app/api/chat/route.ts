import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { message } = await req.json();

    const userMessage = message.toLowerCase();

    let reply = "If you have any questions, please contact our support team through our accounts:*Email: stylikstore.info@gmail.com *Phone Number: +971555059115 *Instagram: @stayilkstore *TikTok: @stayilkstore";

    if (
      userMessage.includes("shipping") ||
      userMessage.includes("delivery")
    ) {
      reply =
        "Shipping usually takes 2-5 business days depending on your location.";
    }

    else if (
      userMessage.includes("size") ||
      userMessage.includes("sizing")
    ) {
      reply =
        "Our hoodies are oversized. We recommend taking your normal size for the perfect fit.";
    }

    else if (
      userMessage.includes("hoodie") ||
      userMessage.includes("product")
    ) {
      reply =
        "Our premium oversized hoodies are crafted for luxury streetwear lovers.";
    }

    else if (
      userMessage.includes("price")
    ) {
      reply =
        "Prices may vary depending on the collection and drop.";
    }

    else if (
      userMessage.includes("order")
    ) {
      reply =
        "For order updates please contact us through Instagram @staylikstore.";
    }

    return NextResponse.json({
      reply,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );

  }

}