"use client";

import { useIntersectionObserver } from "@/core/custom-hook/use-Intersection-observer";
import { usePostsInfinite } from "@/core/hooks/use-posts-infinite";
import { IPost } from "@/types/post";
import { Fragment, useCallback, useEffect, useRef } from "react";
import Masonry from "react-masonry-css";
import PostCard from "./post-card";
import Stories from "./stories";
import SubHeader from "./sub-header";

const masornyConfig = {
  default: 3, // 기본값: 4 열
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
    <div className="py-4 rounded-2xl my-3 w-full">
      {/* <PostForm mutate={mutate} /> */}
      <SubHeader />

      {/* 스토리 */}
      <Stories />

      {!isLoading && !isError ? (
        posts?.pages?.map((page, i) => {
          return (
            <Fragment key={i}>
              <Masonry className="flex" columnClassName="bg-white" breakpointCols={masornyConfig}>
                {page.data.map((post: IPost, j: number) => {
                  return <PostCard key={j} post={post} isLoading={isLoading} />;
                })}
              </Masonry>
            </Fragment>
          );
        })
      ) : isLoading ? (
        <div>게시글 로딩중..</div>
      ) : isError ? (
        <div>다시 시도해주세요</div>
      ) : null}
      {(isFetching || hasNextPage || isFetchingNextPage) && <div>loading...</div>}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
};

export default Posts;
