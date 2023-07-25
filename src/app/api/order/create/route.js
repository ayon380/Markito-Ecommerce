import { headers } from "next/dist/client/components/headers";
import connectDB from "../../../../../middleware/mongoose";
import EUser from "../../../../../models/EUser";
import { NextResponse } from "next/server";
import Order from "../../../../../models/Order";
const JWT_SECRET = process.env.Sec_Key;
const jwt = require("jsonwebtoken");
export async function POST(request) {
  const headersInstance = headers(request);
  const authorization = headersInstance.get("authorization");
  const token = authorization.split(" ")[1];
  const body = await request.json();
  if (!token) {
    return NextResponse.json({ success: false, message: "No token" });
  }
  // const decod = jwt.verify(token, JWT_SECRET);
  console.log(token);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded;
    await connectDB();
  let q;
    // console.log(decoded + "/api/users/verify/route.js");
    const user = await EUser.findById(userId);
    if (user) {
      console.log(body);
      const order = new Order({
        user: userId,
        products: body.products,
        totalPrice: body.totalPrice,
        shippingAddress: body.shippingAddress,
        status: body.status,
      });
      await order.save();
      q = order;
    }
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    return NextResponse.json({
      success: true,
      message: "Order Created Successfully",
      order: q,
    });
  } catch (error) {
    console.log("dsfsfd");
    return NextResponse.json({ success: false, message: error.message });
  }
}
