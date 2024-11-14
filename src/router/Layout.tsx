import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";
import {
  FaUser,
  FaHome,
  FaWallet,
  FaCreditCard,
  FaGift,
  FaTag,
  FaEdit,
  FaCheckSquare,
  FaUserCheck,
} from "react-icons/fa";
import { NavItem } from "../components/SideNav/interface";
import { getUserDetails } from "@src/store/slices/user.slice";
import { useAppDispatch } from "@src/store/store";

export const navData: NavItem[] = [
  { to: "/", label: "Home", icon: <FaHome /> },
  { to: "/customer", label: "Customer", icon: <FaUserCheck /> },
  { to: "/final-customer", label: "Final Customer", icon: <FaUser /> },
  {
    to: "/confirmation-list",
    label: "Confirmation List",
    icon: <FaCheckSquare />,
  },
  { to: "/wallet", label: "Wallet", icon: <FaWallet /> },
  { to: "/payment", label: "Payment", icon: <FaCreditCard /> },
  { to: "/reward", label: "Reward", icon: <FaGift /> },
  { to: "/price", label: "Price", icon: <FaTag /> },
  { to: "/change-profile", label: "Change Profile", icon: <FaEdit /> },
];

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserDetails());
  }, []);
  return (
    <div className="flex h-screen">
      <SideNav data={navData} />
      <div className="flex-1 p-4 overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
