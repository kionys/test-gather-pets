"use client";

import { Footer } from "@/components/templates/footer";
import { Header } from "@/components/templates/header";
import { useSession } from "next-auth/react";
import { lazy } from "react";

const Sidenav = lazy(() => import("@/components/templates/sidenav"));
const Posts = lazy(() => import("@/components/templates/posts"));

export default function Home() {
  const { status } = useSession();

  if (status === "loading") return <>Loading...</>;
  if (status !== "authenticated") return <>Not Authenticated</>;
  if (status === "authenticated")
    return (
      <div className="sm:flex w-full h-screen sm:overflow-auto pt-12 sm:pt-0">
        <Header />
        <Sidenav />
        <Posts />
        <Footer />
      </div>
    );
}
