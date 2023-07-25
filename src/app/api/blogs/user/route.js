import { headers } from "next/dist/client/components/headers";
import connectDB from "../../../../../middleware/mongoose";
import Blog from "../../../../../models/Blog";
import EUser from "../../../../../models/EUser";
import { NextResponse } from "next/server";
const mongoose = require("mongoose");
const JWT_SECRET = process.env.Sec_Key;
const jwt = require("jsonwebtoken");

export async function POST(request) {
  const headersInstance = headers(request);
  const authorization = headersInstance.get("authorization");
  const token = authorization.split(" ")[1];
  if (!token) {
    return NextResponse.json({ success: false, message: "No token" });
  }
  console.log("\n\n /api/blogs/user/route.js\n\n");
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded;
    await connectDB();
    const user = await EUser.findById(userId);

    const tqw = await user._id;
    console.log(tqw + "/" + userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    
    const blogs = await Blog.find({ user:userId });
    console.log(blogs);
    if (!blogs || blogs.length === 0) {
      return NextResponse.json({ success: false, message: "Blogs not found" });
    }

    return NextResponse.json({ success: true, blogs});
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
