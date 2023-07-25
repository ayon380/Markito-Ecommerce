import { NextResponse } from "next/server";
import EUser from "../../../../../models/EUser";
import Blog from "../../../../../models/Blog";
import connectDB from "../../../../../middleware/mongoose";
export async function GET(req, { params }) {
  console.log("params" + params.slug);
  console.log("/api/blogs/[slug]/route.js");
  try {
    await connectDB();
    const users = await EUser.find({});
    const blog = await Blog.findOne({ title: params.slug }).populate("user");
    if (!blog) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Blog not found" })
      );
    }
    return new NextResponse(JSON.stringify({ success: true, blog }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message })
    );
  }
}
