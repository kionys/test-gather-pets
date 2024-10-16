import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 w-full h-[100vh] justify-center items-center">
      <div className="">메인 페이지</div>
      <Link href={"/login"}>로그인/회원가입</Link>
    </div>
  );
}
