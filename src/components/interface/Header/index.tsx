import Link from "next/link";
import React from "react";
import { ModeToggleButton } from "@/components/interface/ModeToggle";

const Header = () => {
  return (
    <header className="p-6 dark:bg-zinc-900 flex items-center justify-between">
      <h1 className="text-2xl dark:text-white">
        <Link
          href="/"
          className="text-purple-700 font-bold text-3xl cursor-pointer"
        >
          YT
        </Link>{" "}
        Fetch
      </h1>
      <ModeToggleButton />
    </header>
  );
};

export default Header;
