import connectDB from "../../../../middleware/mongoose";
import Trending from "../../../../models/Trending";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    
    const products = await Trending.find({}).populate("products.product_id");
    console.log("Products:", products); // Check if products are populated correctly

    return new NextResponse(JSON.stringify({ success: true, products : products[0].products}));
  } catch (error) {
    console.error("Error fetching trending products:", error);
    return new NextResponse(JSON.stringify({ success: false, error }));
  }
}
