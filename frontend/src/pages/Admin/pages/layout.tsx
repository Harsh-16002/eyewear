// Layout.tsx
import React, { useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page content */}
        <div className="flex-1 p-4 bg-gray-100">{children}</div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
