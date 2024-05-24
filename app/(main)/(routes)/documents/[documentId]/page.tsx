"use client";

import { patchDocumentCall } from "@/calls/DocumentCalls";
import Cover from "@/components/Cover";
import Toolbar from "@/components/Toolbar";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useOneDocumentQuery } from "@/hooks/useOneDocumentQuery";
import { GET_IMAGE_BASE_PATH } from "@/lib/routing";
import { useMutation, useQuery } from "convex/react";

import dynamic from "next/dynamic";
import { useMemo } from "react";

interface Props {
  params: {
    documentId: Id<"documents">;
  };
}

const Page = ({ params }: Props) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor/Editor"), { ssr: false }),
    []
  );

  const document = useOneDocumentQuery(params.documentId);

  const onChange = (content: string) => {
    patchDocumentCall(params.documentId,      
    {
      content      
    });
  };

  if (!document.data || document.isLoading) {
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

  if (document.data === null) {
    <div>Not Found</div>;
  }
  console.log(document.data)
  return (
    <div className="pb-40">
      <Cover url={GET_IMAGE_BASE_PATH(document.data.collectionId, document.data.id, document.data.coverImage)} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document.data} />
        <Editor onChange={onChange} initialContent={document.data.content} />
      </div>
    </div>
  );
};

export default Page;
