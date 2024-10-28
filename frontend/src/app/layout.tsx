import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Web3ModalProvider from "@/context/WagmiProvider";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { config } from "@/config/wagmi";
import { ReduxProvider } from "@/redux/reduxProvider";
import BasicInfo from "@/components/Info/BasicInfo";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en" data-theme="black">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-noto-sans`}>
        <ReduxProvider>
          <Web3ModalProvider initialState={initialState}>
            <Navbar />
            <BasicInfo />
            {children}
          </Web3ModalProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
