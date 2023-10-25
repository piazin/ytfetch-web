import { Label } from "@/components/ui/label";
import React, { LabelHTMLAttributes, ReactNode } from "react";

interface ButtonIconProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const ButtonLabel = ({ children, ...rest }: ButtonIconProps) => {
  return <Label {...rest}>{children}</Label>;
};
