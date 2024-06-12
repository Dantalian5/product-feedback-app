import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "@/styles/globals.css";
//
import SessionWrapper from "@/components/auth/SessionWrapper";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Feedback App | by MV",
  description: "Full Stack project from FrontendMentor.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`${jost.className} min-h-svh min-w-[320px] overflow-x-hidden bg-gray-200 sm:px-10 sm:py-14`}
        >
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
