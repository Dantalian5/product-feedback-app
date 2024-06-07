import React from "react";
import { svgBackArrow } from "@/utils/svgIcons";
interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  children: React.ReactNode;
  color?: "violet" | "blue" | "dark" | "orange";
  textColor?: "dark" | "blue" | "gray";
  icon?: boolean;
  isStretched?: boolean;
  hoverUnderline?: boolean;
}

const colors = {
  violet: "bg-violet",
  blue: "bg-blue-200",
  dark: "bg-dark-200",
  orange: "bg-orange-200",
  none: "bg-none",
};
const text_colors = {
  dark: "text-dark-100",
  blue: "text-blue-200",
  gray: "text-gray-100",
};

const Button = (props: ButtonProps) => {
  const {
    children,
    color = "none",
    textColor,
    hoverUnderline,
    icon = false,
    isStretched = false,
    ...rest
  } = props;

  const buttonSize = isStretched ? "py-0 px-2" : "py-2.5 px-4 sm:py-3 sm:px-6";
  let finalColor;
  if (textColor) {
    finalColor = text_colors[textColor];
  } else {
    finalColor = color === "none" ? text_colors.dark : text_colors.gray;
  }
  const buttonColors = `${colors[color]} ${hoverUnderline ? "hover:underline" : `hover:${colors[color]}/75`} ${finalColor} underline-offset-1`;

  return (
    <button
      className={`${buttonColors} ${buttonSize} custom-focus flex h-fit w-fit items-center justify-center gap-4 whitespace-nowrap rounded-10 text-13 font-bold sm:text-sm`}
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
