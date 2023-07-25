// pages/api/cart/update.js

import { headers } from "next/dist/client/components/headers";
import connectDB from "../../../../../middleware/mongoose";
import EUser from "../../../../../models/EUser";
import { NextResponse } from "next/server";
const JWT_SECRET = process.env.Sec_Key;
const jwt = require("jsonwebtoken");

export async function POST(request) {
  const headersInstance = headers(request);
  const body  =  await request.json();
  const authorization = headersInstance.get("authorization");
  const token = authorization.split(" ")[1];
  if (!token) {
    return NextResponse.json({ success: false, message: "No token" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded;
    await connectDB();

    const { cart } =body;
    console.log(cart);
    // Save the updated cart to the user in the database
    await EUser.findByIdAndUpdate(userId, { cart });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
