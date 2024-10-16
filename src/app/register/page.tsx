"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
/**
 *
 * @returns 회원가입 페이지
 */
const RegisterPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("현재 페이지: ", pathname);
  }, []);

  const onSubmit = async () => {
    console.log("회원가입 진행");
  };
  return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <div className="w-[300px] flex flex-col gap-3 justify-center items-center">
        <div className="font-bold text-3xl mb-5">회원가입 페이지</div>
        <input type="text" className="border p-3 w-full" placeholder="이메일" />
        <input type="password" className="border p-3 w-full" placeholder="패스워드" />
        <button type="button" className="border p-3 w-full bg-blue-500 text-white" onClick={onSubmit}>
          가입하기
        </button>
        <button type="button" className="border p-3 w-full" onClick={() => router.push("/login")}>
          로그인으로
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
