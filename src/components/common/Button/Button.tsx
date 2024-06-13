import React from "react";
import { svgBackArrow } from "@/utils/svgIcons";
interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  children: React.ReactNode;
  classe: "violet" | "blue" | "dark" | "orange";
  isFlex?: boolean;
}

const Button = (props: ButtonProps) => {
  const { children, classe, isFlex, ...rest } = props;

  const commonColoredClasse = "justify-center px-4 py-2.5 sm:px-6 sm:py-3";
  const classeArr = {
    violet: `${commonColoredClasse} bg-violet-200 text-dark-100 hover:bg-violet-200/75`,
    blue: `${commonColoredClasse} bg-blue-200 text-dark-100 hover:bg-blue-200/75`,
    dark: `${commonColoredClasse} bg-dark-700 text-dark-100 hover:bg-dark-700/75`,
    orange: `${commonColoredClasse} bg-orange-200 text-dark-100 hover:bg-orange-200/75`,
  };

  return (
    <button
      className={`${classeArr[classe]} ${isFlex ? "w-full sm:w-fit" : "w-fit"} custom-focus flex h-fit items-center justify-center gap-4 whitespace-nowrap rounded-10 text-xs font-bold sm:text-sm`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
