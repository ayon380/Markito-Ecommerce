import connectDB from "../../../../../middleware/mongoose";
import EUser from "../../../../../models/EUser";
import { NextResponse } from "next/server";
const JWT_SECRET = process.env.Sec_Key;
import Product from "../../../../../models/Product";
const jwt = require("jsonwebtoken");

// Assuming the required imports and setup are already done.

export async function POST(request) {
  const authorization = request.headers.get("authorization");
  const token = authorization.split(" ")[1];
  const body = await request.json();
  const { productid, content } = body;
  console.log(body);
  if (!token) {
    return NextResponse.json({ success: false, message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded;
    await connectDB();
    const user = await EUser.findById(userId);

    if (user) {
      const product = await Product.findById(productid);

      if (!product) {
        return NextResponse.json({
          success: false,
          message: "Product not found",
        });
      }

      // Create a new comment object with user and content data
      const newComment = {
        user: userId,
        content: content,
        replies: [],
      };

      // Add the new comment to the product's "comments" array
      product.comments.push(newComment);

      // Save the updated product
      await product.save();

      return NextResponse.json({
        success: true,
        message: "Comment added successfully",
        comment : newComment
      });
    } else {
      return NextResponse.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
