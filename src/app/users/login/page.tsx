"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";

/**
 * 로그인 페이지
 * @author 김기원
 */
const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSession();

  // 로그인
  const signInUser = async () => {
    // 이메일 형식 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("유효하지 않은 이메일 형식입니다.");
      return;
    }

    // 비밀번호 조합 조건 검사 (최소 8자리, 특수문자 포함)
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      console.error("비밀번호는 최소 8자리 이상이어야 하며, 특수문자와 숫자를 포함해야 합니다.");
      return;
    }

    // 유효성 검사를 통과한 경우 로그인 시도
    await signIn("credentials", {
      email: email,
      password: password,
      // redirect: true,
      // callbackUrl: "/",
    })
      .then(() => {
        console.log("로그인이 완료되었습니다.");
      })
      .catch(err => {
        console.error("로그인 실패:", err);
      });
  };

  useEffect(() => {
    status === "authenticated" && router.replace("/");
  }, [router, status]);

  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[100vh]">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-center text-2xl font-semibold">Gather Pets</div>
      </div>
      <div className="mt-10 mx-auto w-full max-w-sm flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="이메일"
          className="border border-gray-300 rounded-xl px-4 py-3"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="border border-gray-300 rounded-xl px-4 py-3"
        />
        <button
          onClick={signInUser}
          className="text-white flex gap-2 bg-[#cdcdcd] hover:bg-[#cdcdcd]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
        >
          로그인
        </button>
        <button
          onClick={() => router.push("/users/register")}
          className="text-white flex gap-2 bg-[#828282] hover:bg-[#828282]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
        >
          회원가입
        </button>
      </div>
      <div className="mt-10 mx-auto w-full max-w-sm">
        <div className="flex flex-col gap-3">
          <button
            className="text-white flex gap-2 bg-[#4285F4] hover:bg-[#4285F4]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <AiOutlineGoogle className="w-6 h-6" />
            Sign in with Google
          </button>
          <button
            className="text-white flex gap-3 bg-[#2db400] hover:bg-[#2db400]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center disabled:opacity-30"
            type="button"
            onClick={() => signIn("naver", { callbackUrl: "/" })}
            disabled
          >
            <SiNaver className="w-4 h-4" />
            Sign in with Naver
          </button>
          <button
            className="text-black flex gap-2 bg-[#fef01b] hover:bg-[#fef01b]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center disabled:opacity-30"
            type="button"
            onClick={() => signIn("kakao", { callbackUrl: "/" })}
            disabled
          >
            <RiKakaoTalkFill className="w-6 h-6" />
            Sign in with Kakao
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
