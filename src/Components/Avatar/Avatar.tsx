import React, { useRef, useState } from "react";

interface IAvatar {
  url?: string;
  name?: string;
  isVerified?: boolean;
  onClick?: () => void;
  tooltipText?: string;
}
const Avatar: React.FC<IAvatar> = ({
  url,
  name,
  isVerified,
  onClick,
  tooltipText,
}) => {
  const avatarClass = {
    name: "avatar placeholder",
    image: ``,
  };

  return (
    <div className="flex mb-4">
      <div
        onClick={onClick}
        className={`cursor-pointer ${url ? avatarClass.image : avatarClass.name} ${tooltipText && "tooltip tooltip-right"}`}
        data-tip={tooltipText ? tooltipText : ""}
      >
        {url ? (
          <img
            src={url}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 bg-neutral text-4xl text-neutral-content rounded-full">
            <span>{name && (name[0] + name[1]).toUpperCase()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatar;
