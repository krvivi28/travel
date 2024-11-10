import { Link, useLocation } from "react-router-dom";

interface ProfileLinkProps {
  isCollapsed: boolean;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

const ProfileLink: React.FC<ProfileLinkProps> = ({
  isCollapsed,
  imageUrl,
  firstName,
  lastName,
}) => {
  const location = useLocation();

  return (
    <Link
      to="/profile"
      className={`hover:bg-primary m-2 hover:text-white rounded-md transition-colors ${
        location.pathname === "/profile" ? "bg-primary text-white m-2" : ""
      }`}
    >
      <div className="flex items-center gap-2 p-1 mt-1 mb-1">
        {imageUrl ? (
          <div className="avatar">
            <div className="w-10 rounded-xl">
              <img src={imageUrl} alt="User Avatar" />
            </div>
          </div>
        ) : (
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-12 rounded-full">
              <span>{firstName && lastName && firstName[0] + lastName[0]}</span>
            </div>
          </div>
        )}

        {!isCollapsed && <span>Profile</span>}
      </div>
    </Link>
  );
};

export default ProfileLink;
