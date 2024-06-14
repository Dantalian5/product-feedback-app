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
    <html lang="en">
      <body className={`${jost.className} bg-dark-200`}>
        <div className="lg:px-lmp mx-auto min-h-svh min-w-[320px] max-w-[1440px] overflow-x-hidden sm:px-[5.2%] sm:py-14 lg:pb-[130px] lg:pt-[94px]">
          {children}
        </div>
      </body>
    </html>
  );
}
