"use client";

import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, Trash, Undo } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";

import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useDocumentQuery } from "@/hooks/useDocumentQuery";
import { deleteDocumentCall, patchDocumentCall } from "@/calls/DocumentCalls";
import useDocumentStore from "@/store/store";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();

  const { documents } = useDocumentStore();

  const archivedDocuments = documents.filter((item: any) => item.isArchived === true);
  console.log("[DEBUG TRASHBOX DOCUMENTS]", documents)
  console.log("[DEBUG TRASHBOX]", archivedDocuments)

  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: any
  ) => {
    event.stopPropagation();
    const promise = patchDocumentCall(documentId, {
      isArchived: false,
    })
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note Restored.",
      error: "Failed to restore note!",
    });
  };

  const onRemove = async (document: any) => {

    const promise = deleteDocumentCall(document.id);
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note Deleted.",
      error: "Failed to delete note!",
    });

    if (params.documentId === document.id) {
      router.push("/documents");
    }
  };

  //loading state
  if (!archivedDocuments) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  const filteredDocuments = archivedDocuments.filter((document: any) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  console.log(filteredDocuments);

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-center text-xs text-muted-foreground">
          No documents found!
        </p>
        {filteredDocuments?.map((document: any) => (
          <div
            key={document.id}
            role="button"
            onClick={() => onClick(document.id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, document.id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
