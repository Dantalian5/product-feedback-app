import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "@/styles/globals.css";

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
      <body
        className={`${jost.className} min-h-svh overflow-hidden bg-gray-200`}
      >
        {children}
      </body>
    </html>
  );
}
