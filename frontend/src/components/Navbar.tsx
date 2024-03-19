"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { setTheme, theme } = useTheme();

  return (
    <header className="fixed h-16 border-b-[1px] bg-white dark:bg-black z-20 w-screen">
      <nav className="container flex justify-between p-4 h-full">
        <Image src="/pokemon.svg" alt="logo pokémon" width={100} height={200} />
        <Button
          variant="ghost"
          onClick={() => {
            localStorage.setItem("theme", String(theme));
            setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          <svg
            id="sun-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>

          <svg
            id="moon-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </Button>
      </nav>
    </header>
  );
}

