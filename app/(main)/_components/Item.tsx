"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
  Columns2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { patchDocumentCall, postDocumentCall } from "@/calls/DocumentCalls";
import React from "react";
import { useUser } from "@/hooks/useUser";

interface ItemProps {
  id?: string;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

const Item = ({
  id,
  documentIcon,
  active,
  expanded,
  level = 0,
  onExpand,
  label,
  onClick,
  icon: Icon,
}: ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const user = useUser();

  const params = useParams();
  const router = useRouter();

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = patchDocumentCall(id, {
      isArchived: true,
    })

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash.",
      error: "Failed to archive note!",
    });
  };

  const onSplitView = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    router.push(`/documents/${params.documentId}/${id}`);
  };

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = postDocumentCall({ title: "Untitled", parentDocument: id }).then(
      (document: any) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${document.id}`);
      }
    );
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New Note created.",
      error: "Failed to create a new note!",
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] rounded-r-lg py-3 text-sm pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink text-muted-foreground/50 " />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground " />
      )}
      <span className="truncate">{label}</span>
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground " />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-fit px-2"
              align="start"
              side="right"
              forceMount
            >
              {!!params.documentId && (
              <>
                <DropdownMenuItem onClick={onSplitView}>
                  <Columns2 className="h-4 w-4 mr-2" />
                  Split View
                </DropdownMenuItem>
                <hr/>
              </>
              )}
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="h-4 w-4 mr-2" />
                Move to trash
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last edited by: {user?.data?.name}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            role="button"
            onClick={onCreate}
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12x",
      }}
      className="flex gap-x-2 py-[3px] pl-2"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Item;
