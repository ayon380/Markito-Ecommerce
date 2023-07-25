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
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.log("dsfsfd");
    return NextResponse.json({ success: false, error: error.message });
  }
}
