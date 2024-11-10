import { Link, useLocation } from "react-router-dom";

interface ProfileLinkProps {
  isCollapsed: boolean;
}

const ProfileLink: React.FC<ProfileLinkProps> = ({ isCollapsed }) => {
  const location = useLocation();

  return (
    <Link
      to="/profile"
      className={`hover:bg-primary m-2 hover:text-white rounded-md transition-colors ${
        location.pathname === "/profile" ? "bg-primary text-white m-2" : ""
      }`}
    >
      <div className="flex items-center gap-2 p-1 mt-1 mb-1">
        <div className="avatar">
          <div className="w-10 rounded-xl">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User Avatar"
            />
          </div>
        </div>
        {!isCollapsed && <span>Profile</span>}
      </div>
    </Link>
  );
};

export default ProfileLink;
