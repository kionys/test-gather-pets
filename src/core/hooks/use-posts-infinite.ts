import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePostsInfinite = ({ userId }: { userId?: number }) => {
  const fetchPosts = async ({ pageParam = 1 }) => {
    const { data } = await axios.get("/api/post", {
      params: {
        limit: 10,
        page: pageParam,
        // userId: 3, -- 특정 유저의 id로 모든 게시글을 볼 때 사용예정
      },
    });
    return data;
  };

  const {
    data: posts,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
    refetch: mutate,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.data?.length > 0 ? lastPage.page + 1 : undefined;
    },
  });

  return {
    posts,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
    mutate,
  };
};
