"use client";

import { useSession } from "next-auth/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Avatar from "../elements/avatar";

const Stories = () => {
  const { data: session } = useSession();

  const avatars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  return (
    <div className="py-4 sm:px-4 rounded-2xl w-full max-w-[59.5rem] mx-0 sm:mx-auto">
      <Swiper
        slidesPerView="auto" // 슬라이드가 자동으로 맞춰짐
        direction="horizontal"
        onSlideChange={() => console.log("slide change")}
        onSwiper={swiper => console.log(swiper)}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        pagination={true}
        breakpoints={{
          // 640px 이하일 때 (모바일)
          640: {
            spaceBetween: 0, // 모바일 간격을 좁게 설정
          },
          // 1024px 이상일 때 (웹)
          1024: {
            spaceBetween: 0, // 웹 간격 설정
          },
        }}
      >
        <div className="flex gap-3 overflow-x-auto ml-3 sm:ml-4 pb-2 w-full items-stretch">
          {avatars.map((_, i) => (
            <SwiperSlide
              key={i}
              className="!m-1.5" // margin 제거
              style={{ width: "fit-content" }} // 고정 너비 대신 동적 너비
            >
              <Avatar src={session?.user.image} isActive />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};
export default Stories;
