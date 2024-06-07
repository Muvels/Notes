"use client";

import EditorPage from "./../../../_components/EditorPage";

interface Props {
  params: {
    documentId: string;
  };
}

const Page = ({ params }: Props) => {  
  return (
    <EditorPage params={params} />
  );
};

export default Page;
