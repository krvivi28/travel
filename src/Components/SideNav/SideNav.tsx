import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { IPropsSideNav } from "./interface";
import SideNavItem from "./SideNavItem";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import ThemeToggleIcons from "../../assets/ThemeToggleIcon";
import ProfileLink from "./ProfileLink";

const SideNav: React.FC<IPropsSideNav> = ({ data }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const location = useLocation();
  const [theme, setTheme] = useState<string | null>(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  interface UserData {
    agency_name: string;
    profileImg: { url: string };
  }

  const storedData = localStorage.getItem("user");
  const userData: UserData | null = storedData ? JSON.parse(storedData) : null;
  const agencyName = userData?.agency_name || "";
  const profileImgUrl = userData?.profileImg?.url || "";

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
      document.querySelector("html")?.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const handleToggle = (e: any) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const handleLogout = useCallback(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  return (
    <div
      className={`h-screen drawer ${theme === "light" ? "bg-gray-200 text-black" : "bg-slate-800"} shadow-lg ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 flex flex-col justify-between`}
    >
      <div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="btn btn-ghost m-1 flex justify-center text-xl"
        >
          {isCollapsed ? (
            <FiChevronRight size={20} />
          ) : (
            <FiChevronLeft size={20} />
          )}
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
          <button
            onClick={handleLogout}
            className={`flex items-center p-2 rounded-md transition-colors ${"hover:bg-primary hover:text-white mx-2"}`}
          >
            <FaSignOutAlt className="text-xl ml-1.5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
        <label
          className={`swap swap-rotate p-1 rounded-md transition-colors ${"hover:bg-primary hover:text-white m-2"}`}
        >
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === "light" ? false : true}
          />
          <ThemeToggleIcons />
        </label>
      </div>

      <ProfileLink isCollapsed={isCollapsed}  imageUrl={profileImgUrl} agencyName={agencyName}/>

    </div>
  );
};

export default SideNav;
