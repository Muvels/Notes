"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

import { MenuIcon } from "lucide-react";

import Title from "./Title";
import Banner from "./Banner";
import Menu from "./Menu";
import Publish from "./Publish";
import { useOneDocumentQuery } from "@/hooks/useOneDocumentQuery";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth?: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();

  const document = useOneDocumentQuery(params.documentId as Id<"documents">);


  if (!document.data) {
    return (
      <nav className="bg-background sticky top-2 dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document.data === null) {
    return null;
  }

  return (
    <>
      <nav
        className="
          bg-background sticky top-0 dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-4 border-b z-50"
      >
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        {!document.data.isArchived && (
          <div className="flex items-center justify-between w-full">
            <Title initialData={document.data} />
            <div className="flex items-center gap-x-2">
              <Publish initialData={document.data} />
              <Menu documentId={document.data.id} />
            </div>
          </div>
        )}
      </nav>
      {document.data.isArchived && (
        <Banner documentId={document.data.id} url={document.data.coverImage} />
      )}
    </>
  );
};

export default Navbar;
