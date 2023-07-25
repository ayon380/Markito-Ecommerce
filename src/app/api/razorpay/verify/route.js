import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const crypto = require('crypto');
    const body = await request.json();
    const { soid,  rpid,rs } = body;
    const razorpay_order_id = soid;
    const razorpay_payment_id = rpid;
    const razorpay_signature = rs;
    console.log(razorpay_order_id+"\n"+ razorpay_payment_id+"\n"+razorpay_signature);
    const secret = process.env.RAZOR_PAY_KEY_SECRET;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
      console.log(expectedSignature+"\n\n"+secret);
    const isSignatureValid = expectedSignature === razorpay_signature;
    if (isSignatureValid) {
      return NextResponse.json({
        success: true,
        message: "Payment successful",
      });
    } else {
      return NextResponse.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
