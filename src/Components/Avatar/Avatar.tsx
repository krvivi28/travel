import React, { useRef, useState } from "react";
import bluetick from "@src/assets/icons/bluetick.svg";
import offline from "@src/assets/icons/offline.svg";

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
    <div
      onClick={onClick}
      className={`cursor-pointer relative ${url ? avatarClass.image : avatarClass.name} ${tooltipText && "tooltip tooltip-right"}`}
      data-tip={tooltipText ? tooltipText : ""}
    >
      <div className="w-24 h-24 rounded-full bg-neutral overflow-hidden">
        {(isVerified === false || isVerified === true) && (
          <img
            style={{ width: "20px", height: "20px" }}
            className="absolute left-[68px] bottom-[2px] z-10"
            src={isVerified ? bluetick : offline}
          />
        )}

        {url ? (
          <img src={url} alt="Profile" className="object-covers" />
        ) : (
          <span className="text-4xl text-neutral-content">
            {name && (name[0] + name[1]).toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
};

export default Avatar;
