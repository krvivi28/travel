import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";
// import { navData } from "./utils";
import { FaUser, FaHome, FaWallet, FaCreditCard, FaGift, FaTag, FaEdit, FaSignOutAlt, FaCheckSquare, FaUserCheck } from "react-icons/fa";
import { NavItem } from "../components/SideNav/interface";

export const navData: NavItem[] = [
  { to: "/", label: "Home", icon: <FaHome /> },
  { to: "/customer", label: "Customer", icon: <FaUserCheck /> },
  { to: "/final-customer", label: "Final Customer", icon: <FaUser /> },
  { to: "/confirmation-list", label: "Confirmation List", icon: <FaCheckSquare /> },
  { to: "/wallet", label: "Wallet", icon: <FaWallet /> },
  { to: "/payment", label: "Payment", icon: <FaCreditCard /> },
  { to: "/reward", label: "Reward", icon: <FaGift /> },
  { to: "/price", label: "Price", icon: <FaTag /> },
  { to: "/change-profile", label: "Change Profile", icon: <FaEdit /> },
  { to: "/login", label: "Logout", icon: <FaSignOutAlt /> },
];

const Layout: React.FC = () => (
  <div className="flex h-screen">
    <SideNav data={navData} />
    <div className="flex-1 p-4 overflow-scroll">
      <Outlet />
    </div>
  </div>
);

export default Layout;
