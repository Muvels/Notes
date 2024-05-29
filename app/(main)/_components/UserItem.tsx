"use client";

import { Avatar as Icon } from "@/components/ui/avatar";
import Avatar from 'react-nice-avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";



import { SignOutButton } from "@clerk/clerk-react";
import { ChevronsLeftRight } from "lucide-react";
import Spinner from "@/components/Spinner";
import SpinnerPage from "@/components/SpinnerPage";
import Logout from "@/components/Logout";

const UserItem = () => {
  const user = useUser();

  if (user.isLoading) {
    return (
        <SpinnerPage/>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm px-4 py-6  w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Icon className="h-6 w-6">
              <Avatar className="w-6 h-6" {...user?.data?.avatar}/>
            </Icon>
            <span className="text-start font-medium line-clamp-1">
              {user?.data?.username}&apos;s Jotion
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 h-4 w-4 text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-fit p-2"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex  space-x-2 p-2">
          <div className="p-1">
          <Icon className="h-10 w-10">
              <Avatar className="w-10 h-10" {...user?.data?.avatar}/>
            </Icon>
          </div>
          <div className="flex items-start justify-center text-start flex-col space-y-2">
            <p className="text-sm line-clamp-1">{user?.data?.name}</p>
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {user?.data?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground"
        >
          <Logout/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
