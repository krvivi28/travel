import { useState } from "react";
import { IPropsSideNav } from "./interface";
import SideNavItem from "./SideNavItem";

const SideNav: React.FC<IPropsSideNav> = ({ data }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div
      className={`h-screen bg-slate-800 text-blue-300 shadow-lg ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="btn btn-ghost m-2 flex justify-center"
      >
        {isCollapsed ? ">" : "<"}
      </button>

      <div className="flex flex-col gap-2 mt-4">
        {data.map((item, index) => (
          <SideNavItem
            key={index}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
    </div>
  );
};

export default SideNav;
