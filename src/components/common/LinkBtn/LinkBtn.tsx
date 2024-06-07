import React from "react";
import Link from "next/link";
import { svgBackArrow } from "@/utils/svgIcons";
interface LinkProps extends React.ComponentPropsWithRef<"a"> {
  children: React.ReactNode;
  href: string;
  isStretched?: boolean;
  hoverUnderline?: boolean;
  className?: string;
  bgColor?: "violet" | "blue" | "dark" | "orange";
  textColor?: "dark" | "gray" | "white";
  iconColor?: "blue" | "gray" | "white";
}

const bgColorsArr = {
  violet: "bg-violet",
  blue: "bg-blue-200",
  dark: "bg-dark-200",
  orange: "bg-orange-200",
};
const textColorsArr = {
  dark: "text-dark-100",
  gray: "text-gray-100",
  white: "text-white",
};
const iconColorsArr = {
  blue: "text-blue-200",
  gray: "text-gray-400",
  white: "text-white",
};

const LinkBtn = (props: LinkProps) => {
  const {
    children,
    href,
    hoverUnderline,
    isStretched = false,
    bgColor,
    textColor,
    iconColor,
  } = props;

  return (
    <Link
      href={href}
      className={` custom-focus flex min-w-fit items-center justify-center gap-4 rounded-10 text-13 font-bold underline-offset-1 sm:text-sm ${isStretched ? "p-0" : "px-4 py-2.5 sm:px-6 sm:py-3"} ${bgColor ? bgColorsArr[bgColor] : "bg-none"} ${textColor ? textColorsArr[textColor] : "text-dark-100"} ${hoverUnderline ? "hover:underline" : `hover:${bgColor ? `${bgColorsArr[bgColor]}/75` : "bg-none"}`}`}
    >
      {iconColor && (
        <span className={`${iconColorsArr[iconColor]} text-10`}>
          {svgBackArrow}
        </span>
      )}
      {children}
    </Link>
  );
};

export default LinkBtn;
