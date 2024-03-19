import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";
import { ThemeProvider } from "./ThemeProvider";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "PokéApi",
  description: "PokéApi challenge for natural tech house",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative h-screen w-screen overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          storageKey="theme"
        >
          <StoreProvider>
            <Navbar />
            {children}
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

