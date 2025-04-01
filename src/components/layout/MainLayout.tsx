import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";


const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Mobile sidebar backdrop (only shows on mobile) */}
      {mobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-56 border-r border-border bg-card">
          <Sidebar />
        </aside>

        {/* Sidebar - Mobile */}
        <aside
          className={`fixed lg:hidden w-72 h-full border-r border-border bg-card z-50 transform transition-all duration-300 ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar
            onMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            isMobileSidebarOpen={mobileSidebarOpen}
          />

          <main className="flex-1 overflow-y-auto p-4 md:px-6 md:py-4">
            <div className="max-w-7xl mx-auto">
             {children}
            </div>
           <MobileNav />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
