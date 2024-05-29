"use client";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PocketBase from 'pocketbase';
import cookieCutter from "cookie-cutter"
import Item from "./Item";

import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { useDocumentQuery } from "@/hooks/useDocumentQuery";
import { GET_POCKETBASE_BASE_PATH } from "@/lib/routing";

interface DocumentListProps {
  parentDocumentId?: string;
  level?: number;
  data?: Doc<"documents">[];
}

const DocumentList = ({ parentDocumentId = "", level = 0 }: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();

  const fetchDocuments = useDocumentQuery({
    filter: `parentDocument = "${parentDocumentId}" && isArchived = false`,
  });

  const [documents, setDocuments] = useState<any>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  useEffect(() => {
    if (fetchDocuments.data) {
    setDocuments(fetchDocuments.data);
  }
  }, [fetchDocuments]);


  //loading state
  if (!("items" in documents)) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  // TODO: Figure out recursive thing here
  // =========================================================
  // const pb = new PocketBase(GET_POCKETBASE_BASE_PATH());
  // pb.authStore.loadFromCookie(cookieCutter.get("pb_auth") as string || "")
  // pb.collection('documents').subscribe('*', function (e) {
  //   if (e.action === 'create') {
  //     setDocuments((prevContent: any) => {
  //       prevContent.items.push(e.record);
  //       return prevContent;
  //     })
  //   }
  // });
  // =========================================================

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden pl-4"
        )}
      >
        {level === 0 ? "No pages" : "No pages inside"}
      </p>
      {documents.items.map((document: any) => (
        <div key={document.id}>
          <Item
            id={document.id}
            onClick={() => onRedirect(document.id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document.id}
            onExpand={() => onExpand(document.id)}
            expanded={expanded[document.id]}
            level={level}
          />
          {expanded[document.id] && (
            //to display all the child documents under a parent document
            //all the documents with that parent document id
            <DocumentList parentDocumentId={document.id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
