"use client";
import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

const MyPage = () => {
  const { data: session } = useSession();
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const imgRef = useRef<HTMLInputElement | null>(null);

  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const imageData = e.currentTarget.files;
    const fileReader = new FileReader();

    console.log(imageData && imageData[0]);
    imageData && setFile(imageData[0]);
    // console.log(fileReader);
    // if (imageData && imageData[0]) {
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

  // Create Supabase client

  const uploadFile = async () => {
    if (!file) return;
    // 파일 이름에서 확장자를 추출
    const fileExtension = file.name.split(".").pop(); // 파일 확장자 추출

    // 유저 ID와 타임값, 랜덤 문자열로 경로 생성
    const timestamp = Date.now(); // 현재 시간
    const randomSuffix = Math.random().toString(36).substring(2, 8); // 랜덤 문자열 생성
    const filePath = `${session?.user.id}/${timestamp}_${randomSuffix}.${fileExtension}`; // 경로: userId/타임값_랜덤.확장자

    console.log("파일 경로:", filePath);

    const { data, error } = await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    )
      .storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
      .upload(filePath, file);

    if (error) {
      console.error("파일 업로드 에러:", error.message);
    } else {
      console.log("파일 업로드 성공:", data);
    }
  };

  return (
    <>
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 shadow-lg">
        <Image
          className="object-cover"
          src={image ? (image as string) : "/images/avatar.jpeg"}
          alt="썸네일 이미지"
          width={80}
          height={80}
          priority // 로딩 우선순위 설정
        />
      </div>
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
      <button onClick={uploadFile}>전송</button>
    </>
  );
};
export default MyPage;
