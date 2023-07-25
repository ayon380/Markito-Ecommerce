import Blog from "../../../../models/Blog";
import connectDB from "../../../../middleware/mongoose";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    await connectDB();
    const blogs=await Blog.find({}).populate("user");
    return new NextResponse(JSON.stringify({ success: true, blogs }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false,error:error.message })
    );
  }
}
