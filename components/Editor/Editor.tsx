"use client";

import { Block, BlockFromConfigNoChildren, defaultBlockSpecs, BlockNoteEditor, InlineContentSchema, PartialBlock, StyleSchema } from "@blocknote/core";
import {
  FormattingToolbarController,
  SideMenuController,
  useCreateBlockNote ,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "./styles.css";
import { useTheme } from "next-themes";
import { useMediaQuery } from "usehooks-ts";
import { postFileCall } from "@/calls/DocumentCalls";
import { GET_IMAGE_BASE_PATH } from "@/lib/routing";

import { getDeletedBlocks } from "@/lib/bucket";
import React, { useCallback } from "react";
import { handleDeletedNotes } from "./utils";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  documentId?: string;
}

const Editor = ({ onChange, initialContent, editable, documentId }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 800px)");
  const [actContent, setActContent] = React.useState<any>(initialContent)



  const handleUpload = async (file: File) => {
    console.log(editor.getTextCursorPosition().block.id)
    const response = await postFileCall({
      contentId: editor.getTextCursorPosition().block.id,
      document: documentId as string,
      file
    })

    const url = GET_IMAGE_BASE_PATH(response.collectionId, response.id, response.file)
    return url;
  };

  const defaultBlocks = defaultBlockSpecs

  React.useEffect(() => {
    //console.log("Updated actContent:", actContent);
  }, [actContent]);

  const onEditorContentChange = useCallback(() => {
    setActContent((prevContent: any[]) => {
      const blocks = editor.document;
      if (prevContent) {
        console.log(prevContent)
        const deletedNotes = getDeletedBlocks(prevContent, editor.document);
        handleDeletedNotes(deletedNotes);
      }
      onChange(JSON.stringify(blocks, null, 2));

      return blocks;
    });
  }, [onChange]);


  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent //@ts-ignore
      ? ((initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  return (
    <div className="pt-2">
      <BlockNoteView
        editable={editable}
        onChange={onEditorContentChange}
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      >
        {isSmallScreen ? (
          <>
            {/* <SlashMenuPositioner /> */}
          </>
        ) : (
          <>
            {/* <FormattingToolbarController /> */}
            {/* <HyperlinkToolbarPositioner editor={editor} /> */}
            {/* <SlashMenuPositioner editor={editor} /> */}
            {/* <SideMenuController /> */}
            {/* <ImageToolbarPositioner editor={editor} /> */}
          </>
        )}
      </BlockNoteView>
    </div>
  );
};

export default Editor;

