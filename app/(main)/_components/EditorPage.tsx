"use client";

import { patchDocumentCall } from "@/calls/DocumentCalls";
import Cover from "@/components/Cover";
import Toolbar from "@/components/Toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { getElementInArrayById } from "@/lib/dataUtils";
import { GET_IMAGE_BASE_PATH } from "@/lib/routing";
import useDocumentStore from "@/store/store";
import Navbar from ".//Navbar";


import dynamic from "next/dynamic";
import { useMemo } from "react";

interface Props {
  params: {
    documentId: string;
  };
}

const EditorPage = ({ params }: Props) => {  
  const { documents } = useDocumentStore();

  const Editor =
    useMemo(() => dynamic(() => import("@/components/Editor/Editor"), { ssr: false }),
    [])

  const onChange = async (content: string) => {
    await patchDocumentCall(params.documentId,{
      content      
    });
  };

  if (!documents || documents.length === 0) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-6 w-[40%]" />
            <Skeleton className="h-8 w-[60%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[50%]" />
          </div>
        </div>
      </div>
    );
  }

  const document = getElementInArrayById(documents, params.documentId as string);


  if (document === null || document === undefined) {
    return null;
  }

  const ImageBasePath = document.coverImage ? GET_IMAGE_BASE_PATH(document.collectionId, document.id, document.coverImage) : '/Placeholder.png' 
  console.log(document)
  return (
    <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;"}} className="max-h-screen rounded-lg bg-white dark:bg-[#1F1F1F] flex-1 h-full overflow-y-auto custom-scrollbar">
    <div className="pb-40" >
      <Navbar isCollapsed={false} documentId={params.documentId}/>
      <Cover url={ImageBasePath} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} documentId={document.id} />
      </div>
    </div>
    </div>
  );
};

export default EditorPage;
