import React from "react";
import Link from "next/link";
import { svgBackArrow } from "@/utils/svgIcons";

interface LinkProps extends React.ComponentPropsWithRef<"a"> {
  children: React.ReactNode;
  href: string;
  icon?: boolean;
  classe: "violet" | "blue" | "dark" | "orange" | "noneWhite" | "noneDark";
}

const LinkBtn = (props: LinkProps) => {
  const { children, href, classe, icon = false, ...rest } = props;

  const commonColoredClasse = "justify-center px-4 py-2.5 sm:px-6 sm:py-3";
  const commonTransparentClasse = "justify-start p-0 bg-none hover:underline ";
  const classeArr = {
    violet: `${commonColoredClasse} bg-violet-200 text-dark-100 hover:bg-violet-100`,
    blue: `${commonColoredClasse} bg-blue-200 text-dark-100 hover:bg-blue-300`,
    dark: `${commonColoredClasse} bg-dark-700 text-dark-100 hover:bg-dark-600`,
    orange: `${commonColoredClasse} bg-orange-200 text-dark-100 hover:bg-orange-100`,
    noneWhite: `${commonTransparentClasse} text-white *:text-dark-400`,
    noneDark: `${commonTransparentClasse} text-dark-600 *:text-blue-200`,
  };

  return (
    <Link
      href={href}
      {...rest}
      className={`${classeArr[classe]} custom-focus flex min-w-fit items-center gap-4 rounded-10 text-xs font-bold underline-offset-1 sm:text-sm`}
    >
      {icon && <span className={`block w-fit text-10`}>{svgBackArrow}</span>}
      {children}
    </Link>
  );
};

export default LinkBtn;
