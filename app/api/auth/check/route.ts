import { NextResponse } from "next/server";
import * as Yup from "yup"
import db from "@/db"
import { parse } from "cookie"
import { isAuthenticated } from "@/lib/auth";


const headersSchema = Yup.object({
    cookie: Yup.string().required("JWT is reqiured"),
  })

export async function GET(
  request: Request,
) {
  try {

    await headersSchema.validate(request.headers)
    return await isAuthenticated() ? NextResponse.json(null, {status: 204}) : NextResponse.json(null, {status: 401});    

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
