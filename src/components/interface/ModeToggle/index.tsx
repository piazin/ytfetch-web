"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/interface/Button";

export function ModeToggleButton() {
  const { setTheme, theme } = useTheme();
  const [currentTheme, setCurrentTheme] = React.useState<"dark" | "light">(
    "light"
  );

  React.useEffect(() => {
    setCurrentTheme(theme === "dark" ? "dark" : "light");
  }, [theme]);

  return (
    <Button.Root>
      <Button.Content
        className="dark:bg-zinc-800 dark:hover:bg-zinc-800/70 bg-zinc-100 hover:bg-slate-100/70"
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      >
        <Button.Icon
          icon={currentTheme == "dark" ? Moon : Sun}
          color={currentTheme == "dark" ? "#fff" : "#1e1e1e"}
        />
      </Button.Content>
    </Button.Root>
  );
}
