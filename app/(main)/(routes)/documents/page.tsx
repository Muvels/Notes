"use client";

import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { postDocumentCall } from "@/calls/DocumentCalls";
import SpinnerPage from "@/components/SpinnerPage";
import { ServiceTitle } from "@/lib/initialize";

const Page = () => {
  const user = useUser();
  const router = useRouter();

  const onCreate = () => {
    const promise = postDocumentCall({ title: "Untitled" }).then((document: any) =>
      router.push(`/documents/${document.id}`)
    );
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New Note created.",
      error: "Failed to create a new note!",
    });
  };
  
  if (user.isLoading) {
    return (
        <SpinnerPage/>
    );
  }

  return (
    <div className="noisy h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-lg font-medium">
        Welcome to {user?.data?.username}&apos;s {ServiceTitle()}
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a Note
      </Button>
    </div>
  );
};

export default Page;
