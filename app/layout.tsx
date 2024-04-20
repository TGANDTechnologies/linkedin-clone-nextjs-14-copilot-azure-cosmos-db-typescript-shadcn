import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import connectDB from "@/mongodb/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectDB();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <header className="border-b">
            <Header />
          </header>

          <div className=" bg-[#F4F2ED] flex-1 w-full">
            <div className="max-w-6xl mx-auto">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
