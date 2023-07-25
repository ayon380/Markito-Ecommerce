import bcrypt from "bcrypt";
import EUser from "../../../../../models/EUser";
import connectDB from "../../../../../middleware/mongoose";
import { NextResponse } from "next/server";
const JWT_SECRET = process.env.Sec_Key;
const jwt = require("jsonwebtoken");
export async function POST(request) {
  const data=await request.json()
  const { email, password } = data;
  try {
    await connectDB();
    const user = await EUser.findOne({ email });
    if (!user) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "User not found" })
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Invalid credentials" })
      );
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    return new NextResponse(JSON.stringify({ success: true, token ,user}));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message })
    );
  }
}
