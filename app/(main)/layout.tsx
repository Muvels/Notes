"use client"
import Spinner from "@/components/Spinner";
import Navigation from "./_components/Navigation";
import SearchCommand from "@/components/SearchCommand";
import Navbar from "./_components/Navbar";
import useTokenStore from "@/store/tokenStore";
import useSubscriptionManager from "@/hooks/useSubscriptionManager";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  useSubscriptionManager();
  return (
    <div className="h-full dark:bg-[#1F1F1F] gradient noise">
      <div className="h-full relative flex overflow-hidden">
      <Navigation />

      <div className="h-full w-full py-5 pr-5 flex ">
      <main className="max-h-screen flex-1 h-full">
        <SearchCommand />
        {children}
      </main>
      </div>
      </div>
    </div>
  );
};

export default MainLayout;
