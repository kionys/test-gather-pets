"use client";
import { useSession } from "next-auth/react";
import { lazy } from "react";
import { Footer } from "../components/templates/footer";
import { Header } from "../components/templates/header";

const Sidenav = lazy(() => import("../components/templates/sidenav"));
const Posts = lazy(() => import("../components/templates/posts"));

export default function Home() {
  const { status } = useSession();

  if (status === "loading") return <>Loading...</>;
  if (status !== "authenticated") return <>Not Authenticated</>;
  if (status === "authenticated")
    return (
      <div className="sm:flex w-full h-auto pt-12 sm:pt-0">
        <Header />
        <Sidenav />
        {/* <Sidebar /> */}
        <Posts />
        <div className="max-w-80 bg-gray-100 z-50 hidden xl:flex">
          <div className="bg-blue-300 w-full h-12">
            TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST TEST
          </div>
        </div>
        <Footer />
      </div>
    );
}
