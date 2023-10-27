import { LucideIcon } from "lucide-react";
import React, { ButtonHTMLAttributes, ElementType, ReactElement } from "react";

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ElementType | LucideIcon | ReactElement;
}

export const ButtonIcon = ({ icon: Icon, ...props }: ButtonIconProps) => {
  if (React.isValidElement(Icon)) {
    return Icon;
  }

  const IconComponent = Icon as ElementType | LucideIcon;

  return (
    <IconComponent
      className={`h-4 w-4 ${props.className}`}
      color={props.color}
    />
  );
};
