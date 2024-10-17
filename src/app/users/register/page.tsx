"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
/**
 *
 * @returns 회원가입 페이지
 */
const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const imgRef = useRef<HTMLInputElement | null>(null);

  // 회원가입
  const signUpUser = async () => {
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

    // 유효성 검사를 통과한 경우 회원가입 시도
    try {
      const userData = {
        name,
        email,
        image,
        password,
      };

      const result = await axios.post(`/api/signup`, userData);

      if (result.status === 200) {
        console.log("회원가입 성공! 로그인 페이지로 이동합니다.");
        router.replace(`/users/login`); // 회원가입 후 로그인 페이지로 이동
      } else {
        console.error("회원가입에 실패했습니다.");
      }
    } catch (e: any) {
      console.error("서버 에러:", e.message);
    }
  };

  // 썸네일 이미지
  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const imageData = e.currentTarget.files;
    const fileReader = new FileReader();

    if (imageData && imageData[0]) {
      if (imageData[0].size > 1.5 * 1024 * 1024) {
        //base64 encoding 시 사이즈 33% 증가로 인함
        window.alert("썸네일이미지의 크기는 1.5MB를 초과할 수 없습니다.");
      } else if (
        imageData[0].type === "image/jpg" ||
        imageData[0].type === "image/jpeg" ||
        imageData[0].type === "image/png" ||
        imageData[0].type === "application/pdf"
      ) {
        fileReader.readAsDataURL(imageData[0]);

        fileReader.onload = () => {
          setImage(fileReader.result);
        };
      } else {
        window.alert("형식이 잘못되었습니다");
      }
      return;
    }
  };
  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[100vh]">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-center text-2xl font-semibold">Gather Pets</div>
      </div>
      <div className="mx-auto w-full max-w-sm flex flex-col gap-3">
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-xl space-y-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 shadow-lg">
            <Image
              className="object-cover"
              src={(image as string) || "/images/avatar.jpeg"}
              alt="썸네일 이미지"
              width={80}
              height={80}
              priority // 로딩 우선순위 설정
            />
          </div>
          {name ? <div>{name}</div> : null}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => {
              if (imgRef.current) {
                imgRef.current.click();
              }
            }}
          >
            {image ? "썸네일 변경" : "썸네일 추가"}
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => setImage(null)}
          >
            썸네일 리셋
          </button>
          <input type="file" ref={imgRef} onChange={onChangeImage} accept="image/jpg, image/jpeg, image/png" hidden />
        </div>
        <input
          type="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="이름"
          className="border border-gray-300 rounded-xl px-4 py-3"
        />
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
          onClick={signUpUser}
          className="text-white flex gap-2 bg-[#828282] hover:bg-[#828282]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
