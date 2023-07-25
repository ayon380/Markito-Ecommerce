import { headers } from "next/dist/client/components/headers";
import connectDB from "../../../../middleware/mongoose";
import EUser from "../../../../models/EUser";
import { NextResponse } from "next/server";
const JWT_SECRET = process.env.Sec_Key;
const jwt = require("jsonwebtoken");
export async function PUT(request) {
  const headersInstance = headers(request);
  const data = await request.json();
  const authorization = headersInstance.get("authorization");
  const token = authorization.split(" ")[1];
  console.log("\n\n /api/users/edit/route.js\n\n");
  if (!token) {
    return NextResponse.json({ success: false, message: "No token" });
  }
  // const decod = jwt.verify(token, JWT_SECRET);
  //   console.log(authorization);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded;
    await connectDB();
    console.log(JSON.stringify(data) + "/api/users/edit/route.js");
    const q = await EUser.findById(userId);
    q.cart.push(data.req);
    await q.save();
    console.log("added"+q);
    if (!q) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    return NextResponse.json({ success: true, q });
  } catch (error) {
    console.log("dsfsfd");
    return NextResponse.json({ success: false, error: error.message });
  }
}
