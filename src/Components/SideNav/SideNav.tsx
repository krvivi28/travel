import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { IPropsSideNav } from "./interface";
import SideNavItem from "./SideNavItem";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const SideNav: React.FC<IPropsSideNav> = ({ data }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const location = useLocation();

  // Collapse sidebar when the route changes
  useEffect(() => {
    setIsCollapsed(true);
  }, [location]);

  return (
    <div
      className={`h-screen bg-slate-800 text-blue-300 shadow-lg ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 flex flex-col justify-between`}
    >
      <div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="btn btn-ghost m-2 flex justify-center"
        >
          {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </button>

        <div className="flex flex-col gap-2 mt-4">
          {data.map((item, index) => (
            <SideNavItem
              key={index}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed}
              isActive={location.pathname === item.to}
            />
          ))}
        </div>
      </div>

      <Link
        to="/profile"
        className={`text-base-content hover:bg-primary hover:text-white rounded-md ${
          location.pathname === "/profile" ? "bg-primary text-white" : ""
        }`}
      >
        <div className="flex items-center gap-2 p-4">
          <div className="avatar">
            <div className="w-10 rounded-xl">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="User Avatar"
              />
            </div>
          </div>
          {!isCollapsed && <span className="text-white">Profile</span>}
        </div>
      </Link>
    </div>
  );
};

export default SideNav;
