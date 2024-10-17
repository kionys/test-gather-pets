import { Posts } from "@/components/templates/posts";
import dynamic from "next/dynamic";

// 동적 임포트
const Sidebar = dynamic(() => import("@/components/templates/sidebar"), {
  ssr: false, // 서버 사이드 렌더링 비활성화
});

export default function Home() {
  return (
    <>
      <div className="sm:flex w-full overflow-hidden sm:overflow-auto">
        <Sidebar />
        <Posts />
      </div>
    </>
  );
}
