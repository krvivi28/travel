import { FaUser, FaHome, FaCog, FaChartLine } from "react-icons/fa";
import { NavItem } from "../components/SideNav/interface";

export const isAuthenticated = () => Boolean(localStorage.getItem("token"));
export const navData: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/customer", label: "Customer" },
  // { to: "/user", label: "User", icon: <FaUser /> },
  // { to: "/analytics", label: "Analytics", icon: <FaChartLine /> },
  // { to: "/settings", label: "Settings", icon: <FaCog /> },
];
