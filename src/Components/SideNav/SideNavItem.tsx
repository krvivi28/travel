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
      isActive ? "bg-primary text-white mx-2" : "hover:bg-primary hover:text-white mx-2"
    }`}
  >
    <div className="text-xl ml-1.5">{icon}</div>
    {!isCollapsed && <span className="ml-3">{label}</span>}
  </Link>
);

export default SideNavItem;
