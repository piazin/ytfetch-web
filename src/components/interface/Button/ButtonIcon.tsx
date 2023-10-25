import { LucideIcon } from "lucide-react";
import React, { ElementType, ReactElement } from "react";

interface ButtonIconProps {
  icon: ElementType | LucideIcon | ReactElement;
}

export const ButtonIcon = ({ icon: Icon }: ButtonIconProps) => {
  if (React.isValidElement(Icon)) {
    return Icon;
  }

  const IconComponent = Icon as ElementType | LucideIcon;

  return <IconComponent className="mr-2 h-4 w-4" />;
};
