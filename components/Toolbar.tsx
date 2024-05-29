"use client";

import IconPicker from "./IconPicker";
import { Button } from "./ui/button";
import ReactTextareaAutosize from "react-textarea-autosize";
import { ImageIcon, Smile, X } from "lucide-react";
import { patchDocumentCall } from "@/calls/DocumentCalls";

import React, { ElementRef, useRef, useState } from "react";
import { useCoverImage } from "@/hooks/useCoverImage";

import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import PocketBase from 'pocketbase';
import cookieCutter from "cookie-cutter"
import { GET_POCKETBASE_BASE_PATH } from "@/lib/routing";

interface ToolBarProps {
  initialData: any;
  preview?: boolean;
}

const Toolbar = ({ initialData, preview }: ToolBarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) {
      return;
    }

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    patchDocumentCall(initialData.id,      
      {
        title: value || "Untitled",
      });
    
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    patchDocumentCall(initialData.id,{
        icon
      });
  };

  const onRemoveIcon = () => {
    patchDocumentCall(initialData.id, {
      icon: "",
    })
  };

  const pb = new PocketBase(GET_POCKETBASE_BASE_PATH());
  //pb.authStore.loadFromCookie(cookieCutter.get("pb_auth") as string || "")
  pb.collection('documents').subscribe(initialData.id, function (e) {
    if (e.action === 'update') {
      setValue(e.record.title)
    }
  });

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opcaity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-2">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add Icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
            onClick={coverImage.onOpen}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <ReactTextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="p-0 text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F]dark:text-[#CFCFCF] resize-none cursor-end w-[250px] md:w-[500px] lg:w-[600px]"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F]dark:text-[#CFCFCF] w-[250px] md:w-[500px] lg:w-[600px]"
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
