"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Item from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import useDocumentStore from "@/store/store";

interface DocumentListProps {
  parentDocumentId?: string;
  level?: number;
  data?: any[];
}

const DocumentList = ({ parentDocumentId = "", level = 0 }: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();

  const { documents, fetchDocuments } = useDocumentStore();


  useEffect(() => {
    fetchDocuments({
    filter: `parentDocument = "${parentDocumentId}"`,
  })
  console.log(documents);
} , [fetchDocuments, documents, parentDocumentId]);


  // const [documents, setDocuments] = useState<any>({});
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




  //loading state
  if (!(documents) || documents.length === 0) {
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

  const filteredDocuments = documents.filter((doc: any) => doc.parentDocument === parentDocumentId && doc.isArchived === false);


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
      {filteredDocuments.map((document: any) => (
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
