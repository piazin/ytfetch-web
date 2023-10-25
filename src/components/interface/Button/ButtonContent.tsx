import { Button } from "@/components/ui/button";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonContentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const ButtonContent = ({ children, ...rest }: ButtonContentProps) => {
  return (
    <Button
      {...rest}
      type="button"
      className="bg-purple-700 hover:bg-purple-500/90"
    >
      {children} Baixar
    </Button>
  );
};
