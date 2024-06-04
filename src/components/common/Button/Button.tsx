import React from "react";
import { svgBackArrow } from "@/utils/svg/svgIcons";
interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  children: React.ReactNode;
  color?: "violet" | "blue" | "dark" | "orange";
  icon?: boolean;
  size?: "lg" | "sm";
  hoverUnderline?: boolean;
  className?: string;
}

const colors = {
  violet: "bg-violet",
  blue: "bg-blue-200",
  dark: "bg-dark-200",
  orange: "bg-orange-200",
  none: "bg-none",
};
const sizes = {
  sm: "py-2.5 px-4",
  lg: "py-4",
};
const Button = (props: ButtonProps) => {
  const {
    children,
    color = "none",
    hoverUnderline,
    icon = false,
    size,
    ...rest
  } = props;

  const buttonSize = size ? sizes[size] : "py-3 px-6";

  const buttonColors = `${colors[color]} ${hoverUnderline ? "hover:underline" : `hover:${colors[color]}/75`} ${color === "none" ? "text-dark-100" : "text-gray-100"} underline-offset-1`;

  return (
    <button
      className={`${buttonColors} ${buttonSize} rounded-10  text-13 custom-focus min flex min-w-fit items-center justify-center gap-4 font-bold sm:text-sm`}
      {...rest}
    >
      {icon && (
        <span
          className={`${color === "none" ? "text-blue-200" : "text-gray-400"} text-10`}
        >
          {svgBackArrow}
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
