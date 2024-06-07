"use client";

import { useSearch } from "@/hooks/useSearch";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Columns2, File } from "lucide-react";
import useDocumentStore from "@/store/store";
import { Button } from "./ui/button";

const SearchCommand = () => {
  const router = useRouter();
  const params = useParams();
  const { documents } = useDocumentStore();
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  //to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  const onSplitView = (id: string) => {
    router.push(`/documents/${params.documentId}/${id}`);
    onClose();
  };

  if (!isMounted) return null;

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search your Notes...`} />
      <CommandList className="custom-scrollbar">
        <CommandEmpty>No results found!</CommandEmpty>
        <CommandGroup
          heading={`${documents?.length ? "Documents" : "No documents"}`}
        >
          {documents?.map((document: any) => (
            <div className="flex justify-center items-center hover:bg-secondary" key={document.id}>
            <CommandItem
              key={document._id}
              value={`${document.title}`} //search by document title
              title={document.title}
              onSelect={() => onSelect(document.id)}
              className="cursor-pointer mt-1 w-full hover:bg-none"
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>{document.title}</span>
              </CommandItem>
              <Button 
                onClick={() => onSplitView(document.id)}
                className="z-50 bg-transparent hover:text-blue-500" 
                variant={"link"}
              >
                <Columns2/>
              </Button>
            </div>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
