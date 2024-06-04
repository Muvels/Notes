"use client";

import { deleteDocumentCall, patchDocumentCall } from "@/calls/DocumentCalls";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
  documentId: string;
  url?: string;
}

const Banner = ({ documentId, url }: BannerProps) => {
  const router = useRouter();

  const onRemove = async () => {
    //removes the file from the edge store bucket as well.
    const promise = deleteDocumentCall(documentId);

    toast.promise(promise, {
      loading: "Deleting Note...",
      success: "Note deleted.",
      error: "Failed to remove Note!",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = patchDocumentCall(documentId, { isArchived: false });


    toast.promise(promise, {
      loading: "Restoring Note...",
      success: "Note Restored.",
      error: "Failed to restore Note!",
    });
  };

  return (
    <div className="bg-rose-500 w-full text-white text-center text-sm pl-2 py-4 flex items-center justify-start">
      <p>&#9432; This page is in trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="ghost"
        className="p-1 h-auto font-normal mx-1 md:mx-2"
      >
        Restore Page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button size="sm" variant="ghost" className="p-1 h-auto font-normal">
          Delete Forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
