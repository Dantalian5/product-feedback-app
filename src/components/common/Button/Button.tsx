import React from "react";
interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  children: React.ReactNode;
  color?: "violet" | "blue" | "dark" | "orange";
  icon?: "back";
  size?: "lg";
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
  lg: "py-4",
};

const icons = {
  back: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width=".5em"
      height="1em"
      viewBox="0 0 5 10"
      fill="none"
    >
      <path d="M4 9L0 5L4 1" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

const Button = (props: ButtonProps) => {
  const {
    children,
    color = "none",
    hoverUnderline,
    className,
    icon,
    size,
    ...rest
  } = props;

  const buttonSize = size ? sizes[size] : "py-3";

  const buttonColors = `${colors[color]} ${hoverUnderline ? "hover:underline" : `hover:${colors[color]}/75`} ${color === "none" ? "text-dark-100" : "text-gray-100"} underline-offset-1`;

  const buttonClass =
    `${className || ""} ${buttonColors} ${buttonSize} rounded-[10px]  px-6  text-sm font-bold flex items-center justify-center gap-4 custom-focus`.trim();

  return (
    <button className={buttonClass} {...rest}>
      {icon && (
        <span
          className={`${color === "none" ? "text-blue-200" : "text-gray-400"} text-[.625rem]`}
        >
          {icons[icon]}
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
