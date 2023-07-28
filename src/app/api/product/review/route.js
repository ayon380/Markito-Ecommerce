import connectDB from "../../../../../middleware/mongoose";
import EUser from "../../../../../models/EUser";
import { NextResponse } from "next/server";
const JWT_SECRET = process.env.Sec_Key;
import Product from "../../../../../models/Product";
const jwt = require("jsonwebtoken");

// Assuming the required imports and setup are already done.

// Assuming the required imports and setup are already done.

export async function POST(request) {
  const authorization = request.headers.get("authorization");
  const token = authorization.split(" ")[1];
  const body = await request.json();
  const { productid, content, rating } = body;
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

      // Check if the user has already posted a review for the same product
      const existingReview = product.reviews.find(
        (review) => review.user.toString() === userId.toString()
      );

      if (existingReview) {
        return NextResponse.json({
          success: false,
          message: "You have already posted a review for this product",
        });
      }

      // Create a new review object with user and content data
      const newReview = {
        user: userId,
        content: content,
        stars: rating,
      };

      // Add the new review to the product's "reviews" array
      product.reviews.push(newReview);

      // Save the updated product
      await product.save();

      return NextResponse.json({
        success: true,
        message: "Review added successfully",
        review: newReview,
      });
    } else {
      return NextResponse.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
