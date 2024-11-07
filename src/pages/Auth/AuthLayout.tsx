import React from "react";
import logo from "../../assets/logo.svg";
import Metadata from "@src/router/Metadata";

interface IPropsAuthLayout {
  title?: string;
  children: React.ReactNode;
}
const AuthLayout: React.FC<IPropsAuthLayout> = ({ title, children }) => {
  return (
    <>
      <Metadata title={title ? title : "SmartFares"} />
      <div className="h-screen flex items-center justify-center">
        <div className="flex w-[400px] p-8 flex-col gap-4 rounded-md items-center justify-center">
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
