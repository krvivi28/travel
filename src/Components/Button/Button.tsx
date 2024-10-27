import React, { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "filled" | "outlined";
  color?: "primary" | "success" | "secondary" | "error";
  size?: "sm" | "md" | "lg";
}
const Button: React.FC<IButtonProps> = ({
  children,
  variant = "filled",
  color = "primary",
  size = "md",
  ...props
}) => {
  return (
    <>
      <button {...props}>{children}</button>
    </>
  );
};

export default Button;
