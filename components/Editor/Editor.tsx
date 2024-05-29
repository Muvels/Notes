"use client";

import { Block, BlockFromConfigNoChildren, defaultBlockSpecs, BlockNoteEditor, InlineContentSchema, PartialBlock, StyleSchema } from "@blocknote/core";
import {
  BlockNoteView,
  FormattingToolbarPositioner,
  HyperlinkToolbarPositioner,
  ImageToolbarPositioner,
  SideMenuPositioner,
  SlashMenuPositioner,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import "./styles.css";
import { useTheme } from "next-themes";
import { useMediaQuery } from "usehooks-ts";
import { postFileCall } from "@/calls/DocumentCalls";
import { GET_IMAGE_BASE_PATH, GET_POCKETBASE_BASE_PATH } from "@/lib/routing";

import { useCallback, useRef } from "react";
import { getDeletedBlocks } from "@/lib/bucket";
import PocketBase from 'pocketbase';
import React from "react";
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
  const editorRef = useRef<BlockNoteEditor | null>(null);



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

  const onEditorContentChange = useCallback((editor: any) => {
    setActContent((prevContent: any[]) => {
      const blocks = editor.topLevelBlocks;
      if (prevContent) {
        console.log(prevContent)
        const deletedNotes = getDeletedBlocks(prevContent, editor.topLevelBlocks);
        handleDeletedNotes(deletedNotes);
      }
      onChange(JSON.stringify(blocks, null, 2));

      return blocks;
    });
  }, [onChange]);


  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent //@ts-ignore
      ? ((initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: onEditorContentChange,
    uploadFile: handleUpload,
    blockSpecs: {
      ...defaultBlocks
    },
    _tiptapOptions: {},
    
  });

  // if (documentId)
  //   new PocketBase(GET_POCKETBASE_BASE_PATH()).collection('documents').subscribe(documentId, function (e) {
  //     console.log(e)
  //     // setActContent(e.record.content);
  // }, { /* other options like expand, custom headers, etc. */ });



  return (
    <div className="pt-2">
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      >
        {isSmallScreen ? (
          <>
            <SlashMenuPositioner editor={editor} />
          </>
        ) : (
          <>
            <FormattingToolbarPositioner editor={editor} />
            <HyperlinkToolbarPositioner editor={editor} />
            <SlashMenuPositioner editor={editor} />
            <SideMenuPositioner editor={editor} />
            <ImageToolbarPositioner editor={editor} />
          </>
        )}
      </BlockNoteView>
    </div>
  );
};

export default Editor;

