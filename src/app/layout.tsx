import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Jost } from "next/font/google";
import "@/styles/globals.css";
//
import SessionWrapper from "@/components/auth/SessionWrapper";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Feedback App | by MV",
  description:
    "Product Feedback App. Full Stack project from FrontendMentor.io",
  openGraph: {
    title: "Product Feedback App | by MV",
    description:
      "Product Feedback App. Full Stack project from FrontendMentor.io",
    url: "https://frontend-feedback.vercel.app/",
    siteName: "frontend-feedback",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Feedback App | by MV",
    description:
      "Product Feedback App. Full Stack project from FrontendMentor.io",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/assets/favicon/apple-touch-icon.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} bg-dark-200`}>
        <div className="mx-auto min-h-svh min-w-[320px] max-w-[1440px] overflow-x-hidden sm:px-[5.2%] sm:py-14 lg:px-lmp lg:pb-[130px] lg:pt-[94px]">
          <SessionProvider>{children}</SessionProvider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
