"use client";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import Item from "./Item";

import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { useDocumentQuery } from "@/hooks/useDocumentQuery";

interface DocumentListProps {
  parentDocumentId?: string;
  level?: number;
  data?: Doc<"documents">[];
}

const DocumentList = ({ parentDocumentId = "", level = 0 }: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();

  const documents = useDocumentQuery({
    filter: `parentDocument = "${parentDocumentId}" && isArchived = false`,
  });

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
  if (!documents.data) {
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

  console.log(documents.data);

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
      {documents.data.items.map((document: any) => (
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
