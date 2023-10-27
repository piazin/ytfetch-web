import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="p-6 bg-zinc-900">
      <h1 className="text-2xl">
        <Link
          href="/"
          className="text-purple-700 font-bold text-3xl cursor-pointer"
        >
          YT
        </Link>{" "}
        Fetch
      </h1>
    </header>
  );
};

export default Header;
