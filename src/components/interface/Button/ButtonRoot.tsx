import React, { ReactNode } from "react";

interface ButtonRootProps {
  children: ReactNode;
}
export function ButtonRoot({ children }: ButtonRootProps) {
  return <>{children}</>;
}
