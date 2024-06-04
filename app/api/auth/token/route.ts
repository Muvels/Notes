import { NextResponse } from "next/server";
import db from "@/db"
import { getCookieServerSide } from "@/lib/auth";

export async function GET(
  request: Request
) {
  try {
    const result = getCookieServerSide();
    if (typeof result === "undefined" || result === "") {
      return NextResponse.json((JSON.stringify({ error: "No token" })), {status: 400});
       
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
