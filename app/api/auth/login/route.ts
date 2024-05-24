import { NextResponse } from "next/server";

import db from "@/db"
import { serialize } from "cookie"

export async function POST(
  request: Request,
) {
  try {
    const { email, password } = await request.json();
    console.log(email)
    console.log(password)
    console.log("form:", { email, password })
    const result = await db.authenticate(email, password)
    const { record, token } = result
    record.token = token
    //require('next/headers').cookies().set('pb_auth', db.client.authStore.exportToCookie());

    const response = NextResponse.json(record);
    response.headers.set(
      "Set-Cookie",
      serialize("pb_auth", db.client.authStore.exportToCookie(), { path: "/" })
    )
    return response;
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
