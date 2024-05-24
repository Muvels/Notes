import { NextResponse } from "next/server";
import db from "@/db"
import * as Yup from "yup"
import { FilterOptions, FrontendDocuments, documents } from "@/db/types";
import { Shape } from "@/lib/yup";

const documentSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    userId: Yup.array<string[]>().required("userId is required"),
    isArchived: Yup.boolean().optional(),
    parentDocument: Yup.string().optional(),
    content: Yup.string().optional(),
    coverImage: Yup.string().optional(),
    icon: Yup.string().optional(),
    isPublished: Yup.boolean().required("isPublished is required"),
    })

const filterSchema = Yup.object({
    filter: Yup.string().optional(),
    sort: Yup.string().optional(),
    expand: Yup.string().optional(),
})

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();
    const data: documents = await documentSchema.validate(body, { stripUnknown: true });
    const document = await db.createDocument(data);
    return NextResponse.json(document);

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

export async function GET(
    request: Request,
  ) {
    try {
        const headers = request.headers;
        const filters = {
            filter: headers.get('filter') || undefined,
            sort: headers.get('sort') || undefined,
            expand: headers.get('expand') || undefined,
          };

      const data: FilterOptions = await filterSchema.validate(filters, { stripUnknown: true });
      const document = await db.listDocuments(data);
      return NextResponse.json(document);
  
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
