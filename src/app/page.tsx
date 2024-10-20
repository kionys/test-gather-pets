"use client";

import { useSession } from "next-auth/react";
import { lazy } from "react";

const Sidenav = lazy(() => import("@/components/templates/sidenav"));
const Posts = lazy(() => import("@/components/templates/posts"));

export default function Home() {
  const { status } = useSession();

  if (status === "loading") return <>loading ...</>;
  if (status !== "authenticated") return <>not authenticated</>;
  if (status === "authenticated")
    return (
      <div className="sm:flex w-full h-screen overflow-hidden sm:overflow-auto">
        <Sidenav />
        <Posts />
      </div>
    );
}
