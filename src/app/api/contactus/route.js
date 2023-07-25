import connectDB from "../../../../middleware/mongoose";
import Contact from "../../../../models/Contact";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const data = await req.json();
    await connectDB();
    const contact = new Contact(data);
    await contact.save();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log(err);
  }
}
