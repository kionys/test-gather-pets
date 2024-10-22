"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import Avatar from "../elements/avatar";

const Sidenav = () => {
  const [open, setOpen] = useState<boolean>(true);
  const { data: session } = useSession();

  return (
    <div
      className={`hidden sm:flex flex-col  items-center bg-gray-200 h-screen p-5 pt-8 rounded-r-2xl z-50 ${
        open ? "w-16 xl:w-72 flex-shrink-0" : "w-16"
      } duration-300 sticky top-0 left-0`}
    >
      <div
        className="hidden xl:flex w-10 h-14 items-center justify-center rounded-xl absolute -right-6 top-9 bg-gray-200 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaArrowLeft className="h-4 text-gray-500" /> : <FaArrowRight className="h-4 text-gray-500" />}
      </div>

      {open && (
        <>
          {/* 프로필 */}
          <div className="mt-16 hidden xl:flex">
            <Avatar src={session?.user?.image} isActive className="w-28 h-28" />
          </div>

          {/* 내 정보 */}
          <div className="mt-5 hidden xl:flex flex-col w-full items-center justify-center">
            <div className="font-semibold text-xl">{session?.user.name}</div>
            <div className="text-gray-400">{session?.user.email}</div>
          </div>

          {/* 게시글, 팔로워, 팔로잉 */}
          <div className="mt-10 hidden xl:flex items-center justify-center text-sm">
            <div className="flex flex-col gap-1 items-center justify-center cursor-pointer hover:opacity-60">
              <p className="font-medium text-lg text-gray-800">126</p>
              <p className="text-gray-400 text-sm">게시글</p>
            </div>
            <DividerY />
            <div className="hidden xl:flex flex-col gap-1 items-center justify-center cursor-pointer hover:opacity-60">
              <p className="font-medium text-lg text-gray-800">1.8k</p>
              <p className="text-gray-400 text-sm">팔로워</p>
            </div>
            <DividerY />
            <div className="hidden xl:flex flex-col gap-1 items-center justify-center cursor-pointer hover:opacity-60">
              <p className="font-medium text-lg text-gray-800">558</p>
              <p className="text-gray-400 text-sm">팔로잉</p>
            </div>
          </div>

          {/* 메뉴 */}
          <div className="hidden xl:flex mt-10 flex-col gap-3 w-full">
            <Link href="/" className="px-4 py-3 hover:bg-gray-300 rounded-md w-full text-md flex items-center gap-3">
              <FiBox />
              <p>Home</p>
            </Link>
            <Link href="/" className="px-4 py-3 hover:bg-gray-300 rounded-md w-full text-md flex items-center gap-3">
              <FiBox />
              <p>Feed</p>
            </Link>
            <Link href="/" className="px-4 py-3 hover:bg-gray-300 rounded-md w-full text-md flex items-center gap-3">
              <FiBox />
              <p>Notifications</p>
            </Link>
            <Link
              href="/mypage"
              className="px-4 py-3 hover:bg-gray-300 rounded-md w-full text-md flex items-center gap-3"
            >
              <FiBox />
              <p>My Page</p>
            </Link>
            <DividerX />
            <Link href="/" className="px-4 py-3 hover:bg-gray-300 rounded-md w-full text-md flex items-center gap-3">
              <FiBox />
              <p>Settings</p>
            </Link>
            <button
              className="px-4 py-3 hover:bg-gray-300 rounded-md w-full text-md flex items-center gap-3"
              onClick={() => signOut()}
            >
              <FiBox />
              <p>Logout</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default Sidenav;

const DividerY = () => {
  return (
    <div
      className="w-[54px] h-0 border-t-[0.5px] border-transparent border-gray-500"
      style={{ transform: "rotate(-90deg)", gap: "0px" }}
    ></div>
  );
};
const DividerX = () => {
  return (
    <div
      className="w-[full] h-0 border-t-[0.5px] border-transparent border-gray-600"
      style={{ transform: "rotate(0deg)", gap: "0px" }}
    ></div>
  );
};
