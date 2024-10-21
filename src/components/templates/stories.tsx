"use client";

import { useSession } from "next-auth/react";
import Avatar from "../elements/avatar";

const Stories = () => {
  const { data: session } = useSession();
  const avatars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  return (
    <div className="flex flex-col gap-3 w-full max-w-[1024px] h-auto py-2 my-2 rounded-2xl bg-transparent">
      <div className="ml-5 font-semibold text-xl">Stories</div>
      <div className="flex gap-3 overflow-x-auto mx-3 sm:ml-4 pb-2">
        {avatars.map((_, i) => (
          <Avatar key={i} isActive src={session?.user.image} />
        ))}
      </div>
    </div>
  );
};
export default Stories;
