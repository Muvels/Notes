import db from "@/db";
import * as Yup from "yup"
import { NextResponse } from "next/server";
import { FileBucket, FileObject } from "@/db/types";
import { parseFormDataToJson } from "@/lib/bucket";


const postSchema = Yup.object({
    document: Yup.string().required("We need a document ID"),
    file: Yup.mixed<File>().required("We need a file to upload"),
    contentId: Yup.string().required("We need a contentId"),
})

const deleteSchema = Yup.object({
  bucket: Yup.string().required("We need a bucket ID"),
  record: Yup.string().required("We need a record id"),
  identifier: Yup.string().required("We need a identifier"),
})
export async function POST(
  request: Request,
) {
  try {
    
    const formData = await request.formData();
    const body = parseFormDataToJson(formData);
    const data: FileObject = await postSchema.validate(body, { stripUnknown: true });
    const document = await db.uploadFile(data);
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
    const data: FileBucket = await deleteSchema.validate(body, { stripUnknown: true });
    await db.deleteFile(data);
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