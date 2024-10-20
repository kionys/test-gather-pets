"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
interface IPropsNextProvider {
  children: React.ReactNode;
}

export const NextProvider = ({ children }: IPropsNextProvider) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};

export const NextLayout = ({ children }: IPropsNextProvider) => {
  return <div className="layout">{children}</div>;
};
