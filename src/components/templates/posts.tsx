"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "../../core/custom-hook/use-Intersection-observer";
import { usePostsInfinite } from "../../core/hooks/use-posts-infinite";
import { IPost } from "../../types/post";

import PostCard from "./post-card";
import { PostForm } from "./post-form";
import PostsModal from "./post-modal";
import Stories from "./stories";
const masornyConfig = {
  default: 3, // 기본값: 3 열
  1024: 3, // 1024px 이상: 3 열
  768: 2, // 768px 이상: 2 열
  640: 1, // 640px 이상: 1 열
};
const Posts = ({ userId }: { userId?: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const { posts, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage, isError, isLoading, mutate } =
    usePostsInfinite({ userId: userId });

  const [modalData, setModalData] = useState<IPost | null>(null);
  const [modal, setModal] = useState({
    form: false,
    view: false,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timeId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timeId = setTimeout(() => {
        fetchNext();
      }, 500);
    }
    return () => clearTimeout(timeId);
  }, [fetchNext, isPageEnd, hasNextPage]);

  return (
    <div className="py-4 rounded-2xl w-full max-w-[90rem] mx-0 sm:mx-auto  overflow-y-scroll h-screen">
      {modal.form && <PostForm mutate={mutate} onClose={() => setModal({ ...modal, form: false })} />}
      {modal.view && <PostsModal post={modalData!} onClose={() => setModal({ ...modal, view: false })} />}

      <div className="hidden sm:flex items-center sm:justify-end md:justify-end lg:justify-end gap-3 w-full max-w-[60rem] mx-0 sm:mx-auto h-auto py-2 rounded-2xl bg-transparent px-4">
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="border-zinc-300 border bg-zinc-100 h-12 rounded-full px-4 py-2 w-[360px]"
        />
        <button
          onClick={() => setModal({ ...modal, form: true })}
          className="border-zinc-300 border bg-zinc-100 h-12 rounded-full px-4 py-2 w-fit text-gray-500"
        >
          Add Photo
        </button>
      </div>

      {/* 스토리 */}
      <Stories />

      {!isLoading && !isError ? (
        posts?.pages?.map((page, i) => {
          return (
            <Fragment key={i}>
              {page.data.map((post: IPost, j: number) => {
                return <PostCard key={j} post={post} setModalData={setModalData} setModal={setModal} modal={modal} />;
              })}
            </Fragment>
          );
        })
      ) : isLoading ? (
        <div>loading...</div>
      ) : isError ? (
        <div>다시 시도해주세요</div>
      ) : null}

      {(isFetching || hasNextPage || isFetchingNextPage) && <div>loading...</div>}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
};

export default Posts;
