"use client";

import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  PlusIcon,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
import { useSettings } from "@/hooks/useSettings";
import { cn } from "@/lib/utils";
import UserItem from "./UserItem";
import Item from "./Item";
import DocumentList from "./DocumentList";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TrashBox from "./TrashBox";
import Navbar from "./Navbar";
import { postDocumentCall } from "@/calls/DocumentCalls";
import ItemBlock from "./ItemBlock";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Navigation = () => {
  const search = useSearch();
  const settings = useSettings();

  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const contentRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [isMobile, pathname]);

  const handleCreate = () => {
    const promise = postDocumentCall({ title: "Untitled" }).then((document: any) =>
      router.push(`/documents/${document.id}`)
    );
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New Note created.",
      error: "Failed to create a new note!",
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    //setting the sidebar width limits
    if (newWidth < 240) {
      newWidth = 240;
    }
    if (newWidth > 480) {
      newWidth = 480;
    }
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;

    document.addEventListener("mousemove", handleMouseMove);
    //when we are done with the cursor
    document.addEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current && contentRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      contentRef.current.style.setProperty("display", "block");
      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  //collapsing the sidebar
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current && contentRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      contentRef.current.style.setProperty("display", "none");
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <>
      <aside
        className={cn(
          "pr-5 group/sidebar h-full overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0 min-h-screen"
        )}
        ref={sidebarRef}
      >
        <div ref={contentRef}>
        <div
          role="button"
          onClick={collapse}
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-2 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <div className="flex gap-3 mx-3 mb-5 ">
            <ItemBlock onClick={handleCreate} label="" icon={PlusIcon} />
            <ItemBlock label="" icon={Settings} onClick={settings.onOpen} />
          </div>
          <hr className="border-dotted border-t-4 border-primary/5"/>
          <Item label="Search" icon={Search} onClick={search.onOpen} />
          <hr className="border-dotted border-t-4 border-primary/5"/>
        </div>
        <div className="mt-2">
          <DocumentList />
          <Item onClick={handleCreate} label="Add a Page" icon={Plus} />
          <hr className="border-dotted border-t-4 border-primary/5"/>

          <Popover>
            <PopoverTrigger className="w-full mt-4 ">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? "bottom" : "right"}
              className="p-2 w-72"
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-secondary/20 right-0 top-0"
        />
        </div>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute bottom-0 z-[99999] left-0 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full overflow-x-hidden"
        )}
      >
          <nav className="px-3 py-2 w-full">
            {isCollapsed && (
              <Button onClick={resetWidth} className="bg-secondary hover:bg-secondary border h-14 w-14 gap-3 flex justify-center items-center rounded">
                <MenuIcon
                  role="button"
                  className="h-6 w-6 text-muted-foreground"
                /> 
              </Button>
            )}
          </nav>
      </div>
    </>
  );
};

export default Navigation;
