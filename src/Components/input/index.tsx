import React, { useState, forwardRef } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";

interface IInputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  variant?: "solid" | "outline" | "ghost";
  inputSize?: "sm" | "md" | "lg";
  colorScheme?: "primary" | "secondary" | "danger" | "success" | "warning";
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      label,
      error,
      showPasswordToggle = false,
      variant = "solid",
      inputSize = "md",
      colorScheme = "primary",
      type = "text",
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const inputType = type === "password" && showPassword ? "text" : type;

    const baseStyle = "input input-bordered w-full";
    const sizeStyles = {
      sm: "input-sm",
      md: "",
      lg: "input-lg",
    };
    const colorStyles = {
      primary: "input-primary",
      secondary: "input-secondary",
      danger: "input-error",
      success: "input-success",
      warning: "input-warning",
    };
    const computedClassName = [
      baseStyle,
      sizeStyles[inputSize],
      colorStyles[colorScheme],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`form-control w-full ${error ? "input-error" : ""}`}>
        {label && (
          <label className="label" htmlFor={props.id}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={computedClassName}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xl"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <PiEye size={20} /> : <PiEyeClosed size={20} />}
            </button>
          )}
        </div>
        {error && <span className="label-text-alt text-error">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
