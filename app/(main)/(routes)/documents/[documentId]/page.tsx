"use client";

import { patchDocumentCall } from "@/calls/DocumentCalls";
import Cover from "@/components/Cover";
import Toolbar from "@/components/Toolbar";
import { Skeleton } from "@/components/ui/skeleton";

import { Id } from "@/convex/_generated/dataModel";
import { useOneDocumentQuery } from "@/hooks/useOneDocumentQuery";
import { getDeletedBlocks } from "@/lib/bucket";
import { GET_IMAGE_BASE_PATH } from "@/lib/routing";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

interface Props {
  params: {
    documentId: Id<"documents">;
  };
}

const Page = ({ params }: Props) => {
  const [document, setDocument] = useState<any>(null as any);
  
  const Editor =
    useMemo(() => dynamic(() => import("@/components/Editor/Editor"), { ssr: false }),
    [])

  const  { data: documentData, isLoading } = useOneDocumentQuery(params.documentId);

  useEffect(() => {
    if (documentData) {
      setDocument(documentData);
    }
  }, [documentData]);


  const onChange = async (content: string) => {
    const updatedDocument = await patchDocumentCall(params.documentId,{
      content      
    });
    setDocument(updatedDocument); // Update local state with the new data
  };

  if (isLoading || !document) {
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

  if (document === null) {
    <div>Not Found</div>;
  }
  console.log(document)
  return (
    <div className="pb-40">
      <Cover url={GET_IMAGE_BASE_PATH(document.collectionId, document.id, document.coverImage)} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} documentId={document.id} />
      </div>
    </div>
  );
};

export default Page;
