"use client"
import Spinner from "@/components/Spinner";
import Navigation from "./_components/Navigation";
import SearchCommand from "@/components/SearchCommand";
import Navbar from "./_components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isLoading  = false;

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );


  return (
    <div className="h-full dark:bg-[#1F1F1F] gradient noise">
      <div className="h-full relative flex overflow-hidden">
      <Navigation />

      <div className="h-full w-full py-5 pr-5 flex ">
      <main style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;"}} className="max-h-screen rounded-lg bg-white dark:bg-[#1F1F1F] flex-1 h-full overflow-y-auto custom-scrollbar">
        <SearchCommand />
        <Navbar isCollapsed={false}/>
        {children}
      </main>
      </div>
      </div>
    </div>
  );
};

export default MainLayout;
