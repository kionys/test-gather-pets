"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Sidebar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/users/login");
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <div
        className={`hidden sm:block w-[300px] shrink-0 bg-white h-[100vh] border-r-[1px] overflow-hidden transition-transform duration-200`}
      >
        <div className="w-full h-10 flex font-semibold justify-center text-xl mt-8 border-b-[1px]">Gather Pets</div>
        <div className="w-full flex flex-col items-center overflow-scroll h-[95vh] gap-5">
          <div className="relative w-fit h-fit rounded-full overflow-hidden mt-8">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="Profile Image"
                width={96}
                height={96}
                fill={false}
                priority
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="bg-gray-300 w-24 h-24 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-3xl">{session?.user?.name?.slice(0, 1)}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 items-center">
            <div className="text-sm font-normal">{session?.user?.name}</div>
            <div className="text-md text-gray-500 font-light">{session?.user?.email}</div>
          </div>
          <button
            className="border px-3 py-2 border-blue-500 rounded-lg bg-blue-500 text-white"
            onClick={() => signOut()}
          >
            로그아웃
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default Sidebar;
