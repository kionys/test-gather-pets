"use client";

import { checkEmail, checkPassword } from "@/core/utils/validation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IStateRegisterData {
  name: string;
  email: string;
  password: string;
}

/**
 * 회원가입 페이지
 * @author 김기원
 */
const RegisterPage = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [registerData, setRegisterData] = useState<IStateRegisterData>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (registerData.name && registerData.email && registerData.password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [registerData]);

  const onClickRegister = async () => {
    const isPassEmail = checkEmail(registerData.email);
    const isPassPassword = checkPassword(registerData.password);

    if (isPassEmail && isPassPassword) {
      try {
        await axios.post(`/api/signup`, {
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
        });
        router.replace(`/users/login`);
      } catch (e) {
        throw e;
      }
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[100vh]">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-center text-2xl font-semibold">회원가입 페이지</div>
      </div>
      <div className="mx-auto w-full max-w-sm flex flex-col gap-3">
        <input
          type="name"
          name="name"
          value={registerData.name}
          onChange={onChangeInput}
          placeholder="이름"
          className="border border-gray-300 rounded-xl px-4 py-3"
        />
        <input
          type="email"
          name="email"
          value={registerData.email}
          onChange={onChangeInput}
          placeholder="이메일"
          className="border border-gray-300 rounded-xl px-4 py-3"
        />
        <input
          type="password"
          name="password"
          value={registerData.password}
          onChange={onChangeInput}
          placeholder="비밀번호"
          className="border border-gray-300 rounded-xl px-4 py-3"
        />
        <button
          onClick={onClickRegister}
          className="text-white flex gap-2 bg-[#828282] hover:bg-[#828282]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
          disabled={disabled}
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
