import EUser from "../../../../models/EUser";
import connectDB from "../../../../middleware/mongoose";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;
    console.log("jhj");
    console.log(JSON.stringify(email), JSON.stringify(password));
    // return new NextResponse(JSON.stringify({success:true,message:"Login success"}))
    // return Response.json({message:"Login success"})
    // new NextResponse.json({email})
    const user = await EUser.findOne({ email });
    if (!user) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "User not found" })
      );
    }
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== password) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Password is incorrect" })
      );
    }
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    return new NextResponse(
      JSON.stringify({ success: true, message: "Login success", token })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Something went wrong" })
    );
  }
}
