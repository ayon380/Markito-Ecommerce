import { NextResponse } from "next/server";
import EUser from "../../../../../models/EUser";
import Blog from "../../../../../models/Blog";
import Product from "../../../../../models/Product";
import connectDB from "../../../../../middleware/mongoose";
export async function GET(req, { params }) {
  console.log("params" + params.slug);
  try {
    await connectDB();
    const product = await Product.findOne({ name: params.slug })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "EUser",
        },
      })
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          model: "EUser",
        },
      })
      .populate({
        path: "comments.replies",

        populate: {
          path: "user",
          model: "EUser",
          strictPopulate: false,
        },
      })
      .exec();
    if (!product) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Blog not found" })
      );
    }
    if (product.comments) {
      product.comments.forEach((comment) => {
        if (!comment.replies) {
          comment.replies = [];
        }
      });
    }

    if (product.reviews) {
      product.reviews.forEach((review) => {
        if (!review.replies) {
          review.replies = [];
        }
      });
    }

    return new NextResponse(JSON.stringify({ success: true, product }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message })
    );
  }
}
