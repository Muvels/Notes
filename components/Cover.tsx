"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useParams } from "next/navigation";
import { patchDocumentCall } from "@/calls/DocumentCalls";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: CoverProps) => {
  const params = useParams();

  const coverImage = useCoverImage();

  const onRemove = async () => {
    const promise = patchDocumentCall(params.documentId as string, {
      coverImage: null,
    })

    toast.promise(promise, {
      loading: "Removing cover image",
      success: "Cover image removed.",
      error: "Failed to remove cover image!",
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group bg-muted",
        window.location.toString().includes("preview") ? "dark:bg-black" : ""
      )}
    >
      {!!url && <img src={url} alt="cover" className="object-cover max-h-[35vh] w-full" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            className="text-muted-foreground"
            onClick={() => coverImage.onReplace(url)}
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            className="text-muted-foreground"
            onClick={onRemove}
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[35vh]" />;
};

export default Cover;
