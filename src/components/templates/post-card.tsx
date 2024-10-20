"use client";

import { IPost } from "@/types/post";
import Image from "next/image";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import Avatar from "../elements/avatar";

const PostCard = ({ post, isLoading }: { post: IPost; isLoading: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div key={post.id} className="sm:rounded-2xl overflow-hidden">
      <div className="flex flex-col justify-start w-full items-center gap-2 overflow-hidden flex-wrap py-2 sm:px-3 md:px-4">
        <div className="flex w-full items-center gap-2 px-2">
          <Avatar src={post.user.image || null} className="w-9 h-9" />
          <div className="font-semibold flex w-full justify-start text-md cursor-pointer">
            {post.user.name} ({post.id})
          </div>
          <button className="text-sm text-blue-500 font-semibold">Follow</button>
        </div>
        {/* 피드 이미지 */}
        <Image
          priority
          width={300}
          height={300}
          fill={false}
          src={post.image || ""}
          alt={post.title}
          style={{ objectFit: "cover", display: isLoading ? "none" : "block" }}
          className="w-full h-full object-cover sm:rounded-2xl"
        />
      </div>

      <div className="flex gap-4 items-center justify-start px-3 py-1 sm:px-4 md:px-5">
        <button className="text-sm flex gap-1 items-center">
          <FaHeart className="w-6 h-6" color="red" />
        </button>
        <button className="text-sm flex gap-1 items-center">
          <FaRegComment className="w-6 h-6" />
        </button>
      </div>

      <div className="flex w-full gap-1 mb-7 text-xs px-3 py-1 sm:px-4 md:px-5">
        <p
          className={`font-light transition-all duration-300 ease-in-out ${
            isExpanded ? "" : "line-clamp-2 max-h-[2rem] overflow-hidden text-ellipsis"
          }`}
        >
          {post.content}
        </p>
        <button onClick={toggleContent} className="text-xs text-start text-black font-semibold w-36">
          {isExpanded ? "접기" : "더보기"}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
