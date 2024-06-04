"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { patchDocumentCall } from "@/calls/DocumentCalls";

interface MenuProps {
  documentId: string;
}

const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const user = useUser();

  const onArchive = () => {
    const promise = patchDocumentCall(documentId, {
      isArchived: true, 
    })

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash.",
      error: "Failed to archive note!",
    });

    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-4 w-4 mr-2" />
          Move to trash
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by: {user?.data?.name}.
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="mt-1 h-6 w-10" />;
};

export default Menu;
