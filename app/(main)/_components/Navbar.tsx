"use client";

import { MenuIcon } from "lucide-react";
import Title from "./Title";
import Banner from "./Banner";
import Menu from "./Menu";
import Publish from "./Publish";
import useDocumentStore from "@/store/store";
import { getElementInArrayById } from "@/lib/dataUtils";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth?: () => void;
  documentId: string;
}

const Navbar = ({ isCollapsed, onResetWidth, documentId }: NavbarProps) => {

  const { documents } = useDocumentStore();

  console.log("[DEBUG NAVBAR DOCUMENTS]", documents)


  if (!documents || documents.length === 0) {
    return (
      <nav className="bg-background sticky top-2 dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }
  console.log("[DEBUG NAVBAR documentID]", documentId )

  const document = getElementInArrayById(documents, documentId as string);
  console.log("[DEBUG NAVBAR DOCUMENT]",document)



  if (!document || document.data === null) {
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
        {!document.isArchived && (
          <div className="flex items-center justify-between w-full">
            <Title initialData={document} />
            <div className="flex items-center gap-x-2">
              <Publish initialData={document} />
              <Menu documentId={document.id} />
            </div>
          </div>
        )}
      </nav>
      {document.isArchived && (
        <Banner documentId={document.id} url={document.coverImage} />
      )}
    </>
  );
};

export default Navbar;
