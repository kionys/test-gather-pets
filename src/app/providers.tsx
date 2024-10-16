"use client";

import { SessionProvider } from "next-auth/react";

interface IPropsNextProvider {
  children: React.ReactNode;
}

export const NextProvider = ({ children }: IPropsNextProvider) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const NextLayout = ({ children }: IPropsNextProvider) => {
  return <div className="layout">{children}</div>;
};
