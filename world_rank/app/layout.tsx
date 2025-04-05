import type { Metadata } from "next";
import "./globals.css";
import heroImg from "@/assets/hero-image.jpg";
import Logo from "@/assets/Logo.svg";
import Image from "next/image";
import { CountriesContextProvider } from "@/context/CountriesContext";
import ToastcontainerComponent from "@/components/ToastContainer";

export const metadata: Metadata = {
  title: "WorldRanks-Country Rankings",
  description: "Generated by create next app",
  icons: {
    icon: "./favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-auto overflow-x-hidden bg-[#1C1D1F] dark">
      <body className="mx-auto h-full max-w-screen-xl overflow-x-hidden">
        <div className="flex flex-col">
          <figure className="relative h-[200px] w-full">
            <Image
              alt="logo image"
              src={Logo}
              className="absolute left-1/2 top-[30px] -translate-x-1/2 sm:top-[70px] sm:-translate-y-1/2"
              width={150}
            />
            <Image
              alt="hero image"
              src={heroImg}
              className="h-full object-cover xl:rounded-xl"
            />
          </figure>

          <CountriesContextProvider>
            {children}
            <ToastcontainerComponent />
          </CountriesContextProvider>
        </div>
      </body>
    </html>
  );
}
