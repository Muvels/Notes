import { NextResponse } from "next/server";
import db from "@/db"
export async function POST(
  request: Request
) {
  try {
    const { email, password, username, avatar } =  await request.json();
    console.log("****$$$",email, password, username)
    const result = await db.register(username, email, password, avatar);
    if (typeof result === "undefined") {
      return NextResponse.json((JSON.stringify({ error: "Invalid email or password" })), {status: 400});
       
    }
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
      message: JSON.stringify({ error: err.message || err.toString() }),
    }, {     
      status: 500
    })
  }
}
