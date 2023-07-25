import connectDB from "../../../../../middleware/mongoose";
import EUser from "../../../../../models/EUser";
import { NextResponse } from "next/server";
const JWT_SECRET = process.env.Sec_Key;
import Order from "../../../../../models/Order";
const jwt = require("jsonwebtoken");

export async function POST(request) {
  const authorization = request.headers.get("authorization");
  const token = authorization.split(" ")[1];
  const body = await request.json();
  const { orderid } = body;

  if (!token) {
    return NextResponse.json({ success: false, message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded;
    await connectDB();
    const user = await EUser.findById(userId);

    if (user) {
      const order = await Order.findByIdAndUpdate(
        orderid,
        { status: "Paid" },
        { new: true }
      );
    //   console.log(order);

      return NextResponse.json({
        success: true,
        message: "Payment successful",
      });
    } else {
      return NextResponse.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
