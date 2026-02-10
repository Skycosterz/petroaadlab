import React from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
  headerRight?: React.ReactNode; // opcional (ej. botón refresh, logout, etc.)
};

const DashboardLayout = ({ children, headerRight }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {headerRight ? (
            <div className="container mx-auto px-6 pt-4 pb-2 flex justify-end">
              {headerRight}
            </div>
          ) : null}

          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
