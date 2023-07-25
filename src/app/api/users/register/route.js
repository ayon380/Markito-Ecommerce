import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import EUser from "../../../../../models/EUser";
import connectDB from "../../../../../middleware/mongoose";
export async function POST(request) {
  const data = await request.json();
  console.log(data);
  try {
    const salt = await bcrypt.genSalt(10);
    await connectDB();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const user = new EUser({email:data.email, password:hashedPassword,firstName:data.firstName,lastName:data.lastName,info:data.info,address:data.address,phone:data.phone,state:data.state,city:data.city,zipCode:data.zipCode,cart:data.cart,orders:data.orders,dp:data.dp });
    await user.save();
    return new NextResponse(
      JSON.stringify({ success: true, message: "User created successfully" })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message })
    );
  }
}
