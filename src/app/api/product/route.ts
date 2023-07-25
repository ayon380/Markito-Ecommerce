import connectDB from "../../../../middleware/mongoose";
import { NextResponse } from "next/server";
import Product from "../../../../models/Product";
export async function GET(req: any) {
    try {
        await connectDB();
        const products = await Product.find({});
        return new NextResponse(JSON.stringify({ success: true, products }));
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ success: false, error })
        );
    }
}
