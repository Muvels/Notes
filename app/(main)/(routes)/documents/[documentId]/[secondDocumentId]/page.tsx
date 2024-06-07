"use client";

import EditorPage from "./../../../../_components/EditorPage";


interface Props {
  params: {
    documentId: string;
    secondDocumentId: string;
  };
}

const Page = ({ params }: Props) => {  
  return (
    <div className="max-h-screen flex-1 h-full flex gap-4">
      <EditorPage params={{documentId: params.documentId}} />
      <EditorPage params={{documentId: params.secondDocumentId}} />
    </div>
  );
};

export default Page;
