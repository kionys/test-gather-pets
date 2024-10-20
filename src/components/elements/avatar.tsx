import Image from "next/image";

interface IPropsAvatar {
  src?: string | null;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

const Avatar = ({ src, onClick, className, isActive = false }: IPropsAvatar) => {
  return (
    <div className={`shrink-0 w-20 h-20 cursor-pointer ${className} group`}>
      <div className={`relative w-full h-full rounded-full ${isActive ? "border-2 border-pink-500 p-0.5" : ""}`}>
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            fill
            alt="image"
            quality={75}
            loading="lazy"
            onClick={onClick}
            placeholder="blur"
            className="object-cover"
            src={src || "/images/avatar.jpeg"}
            blurDataURL="data:image/svg+xml;base64,"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200 z-10"></div>
        </div>
      </div>
    </div>
  );
};
export default Avatar;
