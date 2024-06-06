import React from "react";
import Link from "next/link";
import { svgBackArrow } from "@/utils/svgIcons";
interface LinkProps extends React.ComponentPropsWithRef<"a"> {
  children: React.ReactNode;
  href: string;
  color?: "violet" | "blue" | "dark" | "orange";
  icon?: boolean;
  isStretched?: boolean;
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

const LinkBtn = (props: LinkProps) => {
  const {
    children,
    href,
    color = "none",
    hoverUnderline,
    icon = false,
    isStretched = false,
  } = props;

  const buttonSize = isStretched ? "py-0 px-2" : "py-2.5 px-4 sm:py-3 sm:px-6";

  const buttonColors = `${colors[color]} ${hoverUnderline ? "hover:underline" : `hover:${colors[color]}/75`} ${color === "none" ? "text-dark-100" : "text-gray-100"} underline-offset-1`;

  return (
    <Link
      href={href}
      className={`${buttonColors} ${buttonSize} custom-focus  min flex min-w-fit items-center justify-center gap-4 rounded-10 text-13 font-bold sm:text-sm`}
    >
      {icon && (
        <span
          className={`${color === "none" ? "text-blue-200" : "text-gray-400"} text-10`}
        >
          {svgBackArrow}
        </span>
      )}
      {children}
    </Link>
  );
};

export default LinkBtn;
