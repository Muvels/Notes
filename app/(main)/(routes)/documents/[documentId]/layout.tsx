"use client"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <main className="max-h-screen flex-1 h-full">
        {children}
      </main>
  );
};

export default MainLayout;
