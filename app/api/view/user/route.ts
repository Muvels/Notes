import { NextResponse } from "next/server";
import db from "@/db"
import { cookies } from 'next/headers';

export async function GET(
  request: Request,
) {
  try {
    const userData = await db.getUser();
    console.log(userData);
    return NextResponse.json(userData);

} catch (err: any) {
    console.log(err)
    return NextResponse.json({
      headers: {
        "Content-Type": "application/json",
      },
      message: JSON.stringify({ error: err.message || err.toString() }),
    }, {status: 500})
  }
}
