"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 *
 * @returns 로그인 페이지
 */
const LoginPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // 로그인 진행
  const onSubmit = async (type?: string | null) => {
    switch (type) {
      // 구글 로그인
      case "google":
        await signIn("google");
        break;

      // 자체 로그인
      default:
        await signIn("credentials", {
          redirect: false,
          email: loginData.email,
          password: loginData.password,
        });
        break;
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/home");
    }
  }, [session]);
  return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <div className="w-[300px] flex flex-col gap-3 justify-center items-center">
        <div className="font-bold text-3xl mb-5">로그인 페이지</div>
        <input
          type="text"
          name="email"
          value={loginData.email}
          className="border p-3 w-full"
          placeholder="이메일"
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          value={loginData.password}
          className="border p-3 w-full"
          placeholder="비밀번호"
          onChange={onChangeInput}
        />
        <button type="button" className="border p-3 w-full bg-blue-500 text-white" onClick={() => onSubmit(null)}>
          로그인
        </button>
        <button type="button" className="border p-3 w-full" onClick={() => onSubmit("google")}>
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
