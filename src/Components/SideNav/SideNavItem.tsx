import { Link } from "react-router-dom";
import { IPropsSideNavItem } from "./interface";

const SideNavItem: React.FC<IPropsSideNavItem> = ({
  to,
  icon,
  label,
  isCollapsed,
}) => (
  
  <Link
    to={to}
    className="flex items-center p-2 text-base-content hover:bg-primary hover:text-white rounded-md"
  >
    <div className="text-xl ml-3">{icon}</div>
    {!isCollapsed && <span className="ml-3">{label}</span>}
  </Link>
);
export default SideNavItem;
