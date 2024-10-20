"use client";
import { checkEmail, checkPassword } from "@/core/utils/validation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";

interface IStateLoginData {
  email: string;
  password: string;
}

/**
 * 로그인 페이지
 * @author 김기원
 */
const LoginPage = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loginData, setLoginData] = useState<IStateLoginData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loginData.email && loginData.password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [loginData]);

  const onClickLogin = async () => {
    const isPassEmail = checkEmail(loginData.email);
    const isPassPassword = checkPassword(loginData.password);

    if (isPassEmail && isPassPassword) {
      try {
        await signIn("credentials", {
          email: loginData.email,
          password: loginData.password,
          redirect: true,
          callbackUrl: "/",
        });
      } catch (e) {
        throw e;
      }
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[100vh]">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-center text-2xl font-semibold">Gather Pets</div>
      </div>
      <div className="mt-10 mx-auto w-full max-w-sm flex flex-col gap-3">
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={onChangeInput}
          placeholder="이메일"
          className="border border-gray-300 rounded-xl px-4 py-3"
        />
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={onChangeInput}
          placeholder="비밀번호"
          className="border border-gray-300 rounded-xl px-4 py-3"
        />
        <button
          onClick={onClickLogin}
          className="text-white flex gap-2 bg-[#cdcdcd] hover:bg-[#cdcdcd]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center disabled:opacity-30"
          disabled={disabled}
        >
          로그인
        </button>
        <Link
          href="/users/register"
          scroll={false}
          className="text-white flex gap-2 bg-[#828282] hover:bg-[#828282]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
        >
          회원가입
        </Link>
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
