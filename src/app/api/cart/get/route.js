import { headers } from "next/dist/client/components/headers";
import connectDB from "../../../../../middleware/mongoose";
import EUser from "../../../../../models/EUser";
import Product from "../../../../../models/Product";
import { NextResponse } from "next/server";
const JWT_SECRET = process.env.Sec_Key;
const jwt = require("jsonwebtoken");
export async function POST(request) {
  const headersInstance = headers(request);
  const authorization = headersInstance.get("authorization");
  const token = authorization.split(" ")[1];
  console.log("\n\n /api/users/edit/route.js\n\n");
  if (!token) {
    return NextResponse.json({ success: false, message: "No token" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded;
    await connectDB();
    console.log("/api/cart/get/route.js");
    const q = await EUser.findById(userId).populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Product", // Reference to the Product model
      },
    });
    console.log("added" + q.cart);
    if (!q) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    return NextResponse.json({ success: true, cart: q.cart });
  } catch (error) {
    console.log("dsfsfd");
    return NextResponse.json({ success: false, error: error.message });
  }
}
