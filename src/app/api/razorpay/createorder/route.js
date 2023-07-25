import { headers } from "next/dist/client/components/headers";
import connectDB from "../../../../../middleware/mongoose";
import EUser from "../../../../../models/EUser";
import { NextResponse } from "next/server";
const JWT_SECRET = process.env.Sec_Key;
const jwt = require("jsonwebtoken");
export async function POST(request) {
  const headersInstance = headers(request);
  const authorization = headersInstance.get("authorization");
  const token = authorization.split(" ")[1];
  const body = await request.json();
  const { amount } = body;
  console.log(amount);
  if (!token) {
    return NextResponse.json({ success: false, message: "No token" });
  }
  // const decod = jwt.verify(token, JWT_SECRET);
  console.log(token);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded;
    await connectDB();
    // console.log(decoded + "/api/users/verify/route.js");
    const user = await EUser.findById(userId);
    if (user) {
      console.log(amount);
      const Razorpay = require("razorpay");
      console.log(process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_ID)
      console.log(process.env.RAZOR_PAY_KEY_SECRET);
      const instance = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_ID,
        key_secret: process.env.RAZOR_PAY_KEY_SECRET,
      });
      const options = {
        amount: amount,
        currency: "INR",
        receipt: "order_rcptid_11",
      };
      const order = await new Promise((resolve, reject) => {
        instance.orders.create(options, function (err, order) {
          if (err) {
            reject(err);
          } else {
            resolve(order);
          }
        });
      });
      console.log(order);
      return NextResponse.json({ success: true, order: order });
    }
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
