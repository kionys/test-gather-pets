"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
/**
 *
 * @returns 로그인 페이지
 */
const LoginPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("현재 페이지: ", pathname);
  }, []);

  const onSubmit = async () => {
    console.log("로그인 진행");
  };
  return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <div className="w-[300px] flex flex-col gap-3 justify-center items-center">
        <div className="font-bold text-3xl mb-5">로그인 페이지</div>
        <input type="text" className="border p-3 w-full" placeholder="이메일" />
        <input type="password" className="border p-3 w-full" placeholder="패스워드" />
        <button type="button" className="border p-3 w-full bg-blue-500 text-white" onClick={onSubmit}>
          로그인
        </button>
        <button type="button" className="border p-3 w-full" onClick={() => {}}>
          구글 로그인
        </button>
        <button type="button" className="border p-3 w-full" onClick={() => router.push("/register")}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
