import { NextRequest, NextResponse } from "next/server";
import db from "@/db"
import * as Yup from "yup"
import formidable from 'formidable';
import { FilterOptions, FrontendDocuments, documents, updatedDocument } from "@/db/types";
import * as fs from 'fs'
import { parseFormDataToJson } from "@/lib/bucket";
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  }
  };


const filterSchema = Yup.object({
    document: Yup.string().required("We need a document ID"),
})

const documentSchema = Yup.object({
    id: Yup.string().required("id is required"),
    title: Yup.string().optional(),
    userId: Yup.array<string[]>().optional(),
    isArchived: Yup.boolean().optional(),
    parentDocument: Yup.string().optional(),
    content: Yup.string().optional(),
    coverImage: Yup.object().optional(),
    icon: Yup.string().optional(),
    isPublished: Yup.boolean().optional(),
    })

const deleteSchema = Yup.object({
  id: Yup.string().required("id is required"),
  })

export async function GET(
    request: Request,
  ) {
    try {
        const headers = request.headers;
        const filters = {
            document: headers.get('document') || undefined,
          };

      const data = await filterSchema.validate(filters, { stripUnknown: true });
      const document = await db.getDocument(data.document);
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

  export async function PATCH(
    request: NextRequest,
  ) {
    try {

      const formData = await request.formData();
      const body = parseFormDataToJson(formData);
      if (body.coverImage)
        body.coverImage = (body.coverImage as File);
      
      // const data: any = await documentSchema.validate(body, { stripUnknown: true });
      console.log(body)
      const document = await db.updateDocument(body, (body.id as string));
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

  export async function DELETE(
    request: Request,
  ) {
    try {
      const body = await request.json();
      const data: {id: string} = await deleteSchema.validate(body, { stripUnknown: true });
      console.log(data)
      await db.deleteDocument(data.id);
      return new NextResponse(null, {status: 204});
  
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

