"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Posts = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/users/login");
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <div className="py-4 md:p-4 columns-1 md:columns-2 gap-4 lg:columns-3">
        {cards.map(card => (
          <div
            key={card.id}
            className="mb-4 break-inside-avoid-column relative overflow-hidden shadow-lg sm:h-auto h-auto max-h-[350px] sm:max-h-none flex items-center justify-center" // Add flex properties here
          >
            <Image
              src={card.src}
              alt={card.alt}
              width={300} // 기본적으로 설정할 너비
              height={300} // 기본 높이
              fill={false}
              priority
              style={{ objectFit: "cover" }}
              className="w-full h-full object-cover" // sm:h-[350px]
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex justify-between text-white">
              <button className="text-sm">❤️ {card.id}</button>
              <button className="text-sm">💬 Comment</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
};
export const cards = [
  {
    id: 1,
    src: "https://firebasestorage.googleapis.com/v0/b/react-twitter-133b2.appspot.com/o/EUue72Bqi0O3YigWSt2Ql3HgjDJ3%2F17c7a09d-6327-412d-9cf2-c37ff7974c11?alt=media&token=c5752cf4-d7bd-4e03-8095-b479748b6456",
    alt: "Image 1",
    author: "Alice",
    content: "Meet my adorable new puppy! 🐶",
    title: "My New Puppy",
    createdAt: "2024-10-12",
    updatedAt: "2024-10-12",
  },
  {
    id: 2,
    src: "https://firebasestorage.googleapis.com/v0/b/react-twitter-133b2.appspot.com/o/SP1BIx2hzJaqDXYmZovXufHZO5H2%2F7db27399-5548-4b59-b406-10d3aeed164b?alt=media&token=898d2fb2-6938-45e4-a8e5-5c169dfe64c7",
    alt: "Image 2",
    author: "Bob",
    content: "Taking a walk with my cat in the park. 🌳",
    title: "Cat Adventures",
    createdAt: "2024-09-30",
    updatedAt: "2024-10-01",
  },
  {
    id: 3,
    src: "https://firebasestorage.googleapis.com/v0/b/react-twitter-133b2.appspot.com/o/WLH4T7PqsXOj9hL3uWqHGOVUIUM2%2Ff8b97556-0570-4572-937b-83fb87175d35?alt=media&token=6a9eb77f-bff3-41c4-8f82-1e7bf012f5d6",
    alt: "Image 3",
    author: "Charlie",
    content: "Look at my turtle's new home!",
    title: "Turtle Habitat",
    createdAt: "2024-10-05",
    updatedAt: "2024-10-06",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1576470995703-8cb7c5b1beda?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 4",
    author: "Diana",
    content: "My parrot is full of personality! 🦜",
    title: "Parrot Vibes",
    createdAt: "2024-09-25",
    updatedAt: "2024-09-26",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 5",
    author: "Eve",
    content: "My hamster just loves running in its wheel! 🐹",
    title: "Hamster Fun",
    createdAt: "2024-10-02",
    updatedAt: "2024-10-03",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1624895608078-e9f564cbe3fa?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 6",
    author: "Frank",
    content: "My fish tank looks so beautiful at night. 🐠",
    title: "Aquarium Setup",
    createdAt: "2024-09-28",
    updatedAt: "2024-09-29",
  },
  // 복사해서 카드 7-9에 무작위 데이터 추가
  {
    id: 7,
    src: "https://firebasestorage.googleapis.com/v0/b/react-twitter-133b2.appspot.com/o/EUue72Bqi0O3YigWSt2Ql3HgjDJ3%2F17c7a09d-6327-412d-9cf2-c37ff7974c11?alt=media&token=c5752cf4-d7bd-4e03-8095-b479748b6456",
    alt: "Image 1",
    author: "Alice",
    content: "Meet my adorable new puppy! 🐶",
    title: "My New Puppy",
    createdAt: "2024-10-12",
    updatedAt: "2024-10-12",
  },
  {
    id: 8,
    src: "https://firebasestorage.googleapis.com/v0/b/react-twitter-133b2.appspot.com/o/SP1BIx2hzJaqDXYmZovXufHZO5H2%2F7db27399-5548-4b59-b406-10d3aeed164b?alt=media&token=898d2fb2-6938-45e4-a8e5-5c169dfe64c7",
    alt: "Image 2",
    author: "Bob",
    content: "Taking a walk with my cat in the park. 🌳",
    title: "Cat Adventures",
    createdAt: "2024-09-30",
    updatedAt: "2024-10-01",
  },
  {
    id: 9,
    src: "https://firebasestorage.googleapis.com/v0/b/react-twitter-133b2.appspot.com/o/WLH4T7PqsXOj9hL3uWqHGOVUIUM2%2Ff8b97556-0570-4572-937b-83fb87175d35?alt=media&token=6a9eb77f-bff3-41c4-8f82-1e7bf012f5d6",
    alt: "Image 3",
    author: "Charlie",
    content: "Look at my turtle's new home!",
    title: "Turtle Habitat",
    createdAt: "2024-10-05",
    updatedAt: "2024-10-06",
  },
  {
    id: 10,
    src: "https://firebasestorage.googleapis.com/v0/b/react-twitter-133b2.appspot.com/o/EUue72Bqi0O3YigWSt2Ql3HgjDJ3%2F17c7a09d-6327-412d-9cf2-c37ff7974c11?alt=media&token=c5752cf4-d7bd-4e03-8095-b479748b6456",
    alt: "Image 1",
    author: "Alice",
    content: "Meet my adorable new puppy! 🐶",
    title: "My New Puppy",
    createdAt: "2024-10-12",
    updatedAt: "2024-10-12",
  },
  {
    id: 11,
    src: "https://firebasestorage.googleapis.com/v0/b/react-twitter-133b2.appspot.com/o/SP1BIx2hzJaqDXYmZovXufHZO5H2%2F7db27399-5548-4b59-b406-10d3aeed164b?alt=media&token=898d2fb2-6938-45e4-a8e5-5c169dfe64c7",
    alt: "Image 2",
    author: "Bob",
    content: "Taking a walk with my cat in the park. 🌳",
    title: "Cat Adventures",
    createdAt: "2024-09-30",
    updatedAt: "2024-10-01",
  },
  {
    id: 12,
    src: "https://firebasestorage.googleapis.com/v0/b/react-twitter-133b2.appspot.com/o/WLH4T7PqsXOj9hL3uWqHGOVUIUM2%2Ff8b97556-0570-4572-937b-83fb87175d35?alt=media&token=6a9eb77f-bff3-41c4-8f82-1e7bf012f5d6",
    alt: "Image 3",
    author: "Charlie",
    content: "Look at my turtle's new home!",
    title: "Turtle Habitat",
    createdAt: "2024-10-05",
    updatedAt: "2024-10-06",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1576470995703-8cb7c5b1beda?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 4",
    author: "Diana",
    content: "My parrot is full of personality! 🦜",
    title: "Parrot Vibes",
    createdAt: "2024-09-25",
    updatedAt: "2024-09-26",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 5",
    author: "Eve",
    content: "My hamster just loves running in its wheel! 🐹",
    title: "Hamster Fun",
    createdAt: "2024-10-02",
    updatedAt: "2024-10-03",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1624895608078-e9f564cbe3fa?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 6",
    author: "Frank",
    content: "My fish tank looks so beautiful at night. 🐠",
    title: "Aquarium Setup",
    createdAt: "2024-09-28",
    updatedAt: "2024-09-29",
  },
  // 복사해서 카드 7-9에 무작위 데이터 추가
  {
    id: 16,
    src: "https://firebasestorage.googleapis.com/v0/b/react-twitter-133b2.appspot.com/o/EUue72Bqi0O3YigWSt2Ql3HgjDJ3%2F17c7a09d-6327-412d-9cf2-c37ff7974c11?alt=media&token=c5752cf4-d7bd-4e03-8095-b479748b6456",
    alt: "Image 1",
    author: "Alice",
    content: "Meet my adorable new puppy! 🐶",
    title: "My New Puppy",
    createdAt: "2024-10-12",
    updatedAt: "2024-10-12",
  },
  {
    id: 17,
    src: "https://firebasestorage.googleapis.com/v0/b/react-twitter-133b2.appspot.com/o/SP1BIx2hzJaqDXYmZovXufHZO5H2%2F7db27399-5548-4b59-b406-10d3aeed164b?alt=media&token=898d2fb2-6938-45e4-a8e5-5c169dfe64c7",
    alt: "Image 2",
    author: "Bob",
    content: "Taking a walk with my cat in the park. 🌳",
    title: "Cat Adventures",
    createdAt: "2024-09-30",
    updatedAt: "2024-10-01",
  },
  {
    id: 18,
    src: "https://firebasestorage.googleapis.com/v0/b/react-twitter-133b2.appspot.com/o/WLH4T7PqsXOj9hL3uWqHGOVUIUM2%2Ff8b97556-0570-4572-937b-83fb87175d35?alt=media&token=6a9eb77f-bff3-41c4-8f82-1e7bf012f5d6",
    alt: "Image 3",
    author: "Charlie",
    content: "Look at my turtle's new home!",
    title: "Turtle Habitat",
    createdAt: "2024-10-05",
    updatedAt: "2024-10-06",
  },
];
