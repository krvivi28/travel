import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";
import { navData } from "./utils";

const Layout: React.FC = () => (
  <div className="flex h-screen">
    <SideNav data={navData} />
    <div className="flex-1 p-4">
      <Outlet />
    </div>
  </div>
);

export default Layout;
