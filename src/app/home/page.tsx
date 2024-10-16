"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
    if (status !== "authenticated") {
      router.replace("/login");
    }
  }, [session]);
  return (
    <>
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  );
};
export default HomePage;
