"use client";

import Image from "next/image";
import { HiDotsHorizontal } from "react-icons/hi";
import { IPost } from "../../types/post";
import Avatar from "../elements/avatar";
import { IconComment } from "../elements/icons/comment";
import { IconHeart } from "../elements/icons/heart";

interface IPropsPostCard {
  post: IPost;
  modal: { form: boolean; view: boolean };
  setModalData: (post: IPost) => void;
  setModal: (modal: { form: boolean; view: boolean }) => void;
}

const PostCard = ({ post, modal, setModalData, setModal }: IPropsPostCard) => {
  return (
    <div key={post.id} className="sm:rounded-2xl overflow-hidden max-w-[50rem] md:max-w-[45rem] mx-auto">
      <div className="flex flex-col justify-start w-full items-center gap-2 overflow-hidden flex-wrap py-2 sm:px-3 md:px-4">
        {/* 유저정보 영역 */}
        <div className="flex w-full items-center justify-between">
          <div className="flex">
            <Avatar src={post.user.image || null} isActive className="w-[40px] h-[40px]" />
            <div className="flex flex-col pl-1">
              <div className="w-20 h-5 font-sans text-sm font-semibold">{post.user.name}</div>
              <div className="w-20 h-5 font-normal text-xs text-gray-500">@{post.user.authType}</div>
            </div>
          </div>

          {/* Dot 드롭다운 영역 */}
          <div className="flex">
            <button className="text-sm text-gray-500 font-semibold">
              <HiDotsHorizontal />
            </button>
          </div>
        </div>

        {/* 피드 이미지 */}
        <Image
          priority
          width={300}
          height={300}
          fill={false}
          src={post.image || ""}
          alt={post.title}
          style={{ objectFit: "cover" }}
          className="w-full h-full object-cover sm:rounded-2xl"
        />
      </div>

      {/* 좋아요, 댓글 */}
      <div className="flex gap-4 items-center justify-start px-3 py-1 sm:px-4 md:px-5 mb-3">
        <button className="text-sm flex gap-1 items-center">
          <IconHeart color={"red"} />
          <p className="font-semibold">157</p>
        </button>
        <button
          className="text-sm flex gap-1 items-center"
          onClick={() => {
            setModalData(post);
            setModal({ ...modal, view: true });
          }}
        >
          <IconComment />
          <p className="font-semibold">23</p>
        </button>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-col w-full text-balance gap-1 mb-7 px-3 py-1 sm:px-4 md:px-5">
        <p className="font-semibold text-sm">{post.title}</p>
        {post.content.split("\n").map((content: string, i: number) => {
          return (
            <p key={i} className="font-normal text-sm">
              {content}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default PostCard;
