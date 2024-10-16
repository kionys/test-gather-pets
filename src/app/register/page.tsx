"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
/**
 *
 * @returns 회원가입 페이지
 */
const RegisterPage = () => {
  const router = useRouter();
  const [registerData, setRegisterData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const onSubmit = async () => {
    console.log("회원가입 진행");
    const data = {
      email: registerData.email,
      name: registerData.name,
      password: registerData.password,
    };
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      res.status === 201 && router.push("/home");
    } catch (e) {
      throw e;
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };
  return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <div className="w-[300px] flex flex-col gap-3 justify-center items-center" onSubmit={onSubmit}>
        <div className="font-bold text-3xl mb-5">회원가입 페이지</div>
        <input
          type="text"
          name="name"
          value={registerData.name}
          className="border p-3 w-full"
          placeholder="이름"
          onChange={onChangeInput}
        />
        <input
          type="text"
          name="email"
          value={registerData.email}
          className="border p-3 w-full"
          placeholder="이메일"
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          value={registerData.password}
          className="border p-3 w-full"
          placeholder="패스워드"
          onChange={onChangeInput}
        />
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
