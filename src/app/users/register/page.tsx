"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
/**
 *
 * @returns 회원가입 페이지
 */
const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpUser = async (email: string, password: string, authType: string) => {
    try {
      const userData = {
        name,
        email,
        password,
        authType,
      };
      try {
        const result = await axios({
          method: "POST",
          url: `/api/signup`,
          data: { ...userData },
        });

        if (result.status === 200) {
          router.replace(`/users/login`);
        } else {
        }
      } catch (e: any) {
        console.log(e);
      }
    } catch {}
  };

  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[60vh]">
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
          onClick={() => signUpUser(email, password, "self")}
          className="text-white flex gap-2 bg-[#828282] hover:bg-[#828282]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
