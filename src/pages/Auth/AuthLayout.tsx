import React from "react";
import logo from "../../assets/logo.svg";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/logo3.png";
import Metadata from "@src/router/Metadata";

interface IPropsAuthLayout {
  title?: string;
  children: React.ReactNode;
  width?: "sm" | "md" | "lg";
}
const AuthLayout: React.FC<IPropsAuthLayout> = ({
  title,
  children,
  width = "sm",
}) => {
  const layoutWidth = {
    sm: "w-[400px]",
    md: "w-[800px]",
    lg: "w-[1200px]",
  };
  return (
    <>
      <Metadata title={title ? title : "SmartFares"} />
      <div className="h-screen flex items-center justify-center">
        <div
          className={`flex ${layoutWidth[width]} p-8 flex-col gap-4 rounded-md items-center justify-center`}
        >
          <img src={logo} alt="" />
          <h1 className="font-medium text-2xl">
            <span className="text-[#0052CC]">{title}</span>
          </h1>
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
