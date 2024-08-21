import React from "react";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import Navbar from "../ui/dashboard/navbar/navbar";

const Layout = ({ children } : any) => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
        {children}
      </div>
    </div>
  );
};

export default Layout;
