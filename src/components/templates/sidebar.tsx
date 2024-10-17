"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Sidebar = () => {
  const { data: session, status } = useSession();

  return (
    <div
      className={`hidden sm:block w-[300px] shrink-0 bg-white h-[100vh] border-r-[1px] overflow-hidden transition-transform duration-200`}
    >
      <div className="w-full h-10 flex font-semibold justify-center text-xl mt-8 border-b-[1px]">Gather Pets</div>
      <div className="w-full flex flex-col items-center overflow-scroll h-[95vh] gap-5">
        <div className="relative w-fit h-fit rounded-full overflow-hidden mt-8">
          <Image
            className="object-cover"
            src={session?.user?.image ? session.user.image : "/images/avatar.jpeg"}
            alt="썸네일 이미지"
            width={80}
            height={80}
            priority // 로딩 우선순위 설정
          />
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
};
export default Sidebar;
