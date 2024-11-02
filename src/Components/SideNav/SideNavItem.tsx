import { Link } from "react-router-dom";
import { IPropsSideNavItem } from "./interface";

const SideNavItem: React.FC<IPropsSideNavItem> = ({
  to,
  icon,
  label,
  isCollapsed,
  isActive,
}) => (
  <Link
    to={to}
    className={`flex items-center p-2 rounded-md transition-colors ${
      isActive ? "bg-primary text-white" : "hover:bg-primary hover:text-white"
    }`}
  >
    <div className="text-xl ml-3">{icon}</div>
    {!isCollapsed && <span className="ml-3">{label}</span>}
  </Link>
);

export default SideNavItem;
