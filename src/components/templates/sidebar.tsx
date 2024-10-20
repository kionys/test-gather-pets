"use client";

import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { ChangeEvent, useRef } from "react";
import Avatar from "../elements/avatar";

const Sidebar = () => {
  const { data: session, status, update } = useSession();

  const imgRef = useRef<HTMLInputElement | null>(null);

  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const imageData = e.currentTarget.files;

    if (imageData && imageData[0]) {
      if (imageData[0].size > 1.5 * 1024 * 1024) {
        window.alert("썸네일이미지의 크기는 1.5MB를 초과할 수 없습니다.");
      } else if (
        imageData[0].type === "image/jpg" ||
        imageData[0].type === "image/jpeg" ||
        imageData[0].type === "image/png"
      ) {
        // 업로드 함수 호출
        await uploadFile(imageData[0]);
      } else {
        window.alert("형식이 잘못되었습니다");
      }
      return;
    }
  };

  // 회원 썸네일 변경
  // const uploadFile = async (file: File) => {
  //   if (!file || !session || status !== "authenticated") return;

  //   // 파일 이름에서 확장자를 추출
  //   const fileExtension = file.name.split(".").pop(); // 파일 확장자 추출

  //   // 유저 ID와 타임값, 랜덤 문자열로 경로 생성
  //   const timestamp = Date.now(); // 현재 시간
  //   const randomSuffix = Math.random().toString(36).substring(2, 8); // 랜덤 문자열 생성
  //   const newFilePath = `${session?.user.id}/${timestamp}_${randomSuffix}.${fileExtension}`; // 경로: userId/타임값_랜덤.확장자

  //   // 기존 이미지 파일 제거 로직 추가
  //   const existingImagePath = session?.user?.image?.split("/").pop(); // 기존 이미지 이름 추출
  //   const existingImageFolder = session?.user?.id; // 기존 이미지 폴더 경로

  //   // Supabase 클라이언트 생성
  //   const supabaseClient = createClient(
  //     process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  //   );

  //   if (existingImagePath) {
  //     // 기존 이미지 파일 삭제
  //     try {
  //       await supabaseClient.storage
  //         .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
  //         .remove([`${existingImageFolder}/${existingImagePath}`]); // 기존 이미지 파일 삭제
  //     } catch {}
  //   }

  //   // 새로운 이미지 파일 업로드
  //   supabaseClient.storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string).upload(newFilePath, file);

  //   // 이미지 URL 생성
  //   const requestPath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${newFilePath}`;
  //   try {
  //     const data = { id: session?.user.id, image: requestPath };
  //     await axios
  //       .put(`/api/profile`, data)
  //       .then(res => update({ image: res.data.image }))
  //       .catch(e => console.log(e));
  //   } catch {}
  // };
  // 회원 썸네일 변경
  const uploadFile = async (file: File) => {
    // 파일이 없거나 세션이 유효하지 않으면 종료
    if (!file) return;
    if (!session) {
      window.alert("로그인이 필요합니다.");
      return;
    }
    if (status !== "authenticated") return;

    // 파일 크기 체크
    if (file.size > 1.5 * 1024 * 1024) {
      window.alert("파일 크기는 1.5MB를 초과할 수 없습니다.");
      return;
    }

    // 파일 형식 체크
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      window.alert("지원하지 않는 파일 형식입니다.");
      return;
    }

    // 파일 이름에서 확장자를 추출
    const fileExtension = file.name.split(".").pop(); // 파일 확장자 추출

    // 유저 ID와 타임값, 랜덤 문자열로 경로 생성
    const timestamp = Date.now(); // 현재 시간
    const randomSuffix = Math.random().toString(36).substring(2, 8); // 랜덤 문자열 생성
    const newFilePath = `${session?.user.id}/${timestamp}_${randomSuffix}.${fileExtension}`; // 경로: userId/타임값_랜덤.확장자

    // 기존 이미지 파일 제거 로직 추가
    const existingImagePath = session?.user?.image?.split("/").pop(); // 기존 이미지 이름 추출
    const existingImageFolder = session?.user?.id; // 기존 이미지 폴더 경로

    // Supabase 클라이언트 생성
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    );

    // 기존 이미지 파일 삭제
    if (existingImagePath) {
      const { error: deleteError } = await supabaseClient.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
        .remove([`${existingImageFolder}/${existingImagePath}`]);

      if (deleteError) {
        window.alert("기존 이미지 삭제에 실패했습니다.");
        return;
      }
    }

    // 새로운 이미지 파일 업로드
    const { error } = await supabaseClient.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
      .upload(newFilePath, file);

    if (error) {
      window.alert("파일 업로드에 실패했습니다.");
      return;
    }

    // 이미지 URL 생성
    const requestPath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${newFilePath}`;
    const data = { id: session?.user.id, image: requestPath };

    try {
      const res = await axios.put(`/api/profile`, data);
      update({ image: res.data.image });
    } catch (error) {
      window.alert("프로필 업데이트에 실패했습니다.");
    }
  };

  return (
    <div
      className={`hidden sm:block w-[300px] shrink-0 bg-white h-[100vh] overflow-hidden transition-transform duration-200`}
    >
      <div className="w-full flex flex-col items-center overflow-scroll h-[100vh] gap-3">
        <div
          className="relative w-20 h-20 rounded-full overflow-hidden mt-8 cursor-pointer group"
          onClick={() => imgRef.current && imgRef.current.click()}
        >
          <Avatar src={session?.user?.image} />
          <input type="file" ref={imgRef} onChange={onChangeImage} accept="image/jpg, image/jpeg, image/png" hidden />
          <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            편집
          </div>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div className="text-sm font-normal">{session?.user?.name}</div>
          <div className="text-md text-gray-500 font-light">{session?.user?.email}</div>
        </div>
        <div className="flex">
          <button
            className="border px-3 py-2 border-blue-500 rounded-lg bg-blue-500 text-white"
            onClick={() => signOut()}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
