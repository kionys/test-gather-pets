import { NextResponse } from "next/server";
import prisma from "../../../../db";

interface RequestBody {
  userId: number;
  email: string;
  title: string;
  content: string;
  image?: string | null;
  hashtags: string;
  createdAt: string;
  updatedAt: string;
}

export async function POST(request: Request) {
  // request.json() 형식으로 body 부분 추출
  const body: RequestBody = await request.json();

  const post = await prisma.post.create({
    data: {
      userId: body.userId,
      email: body.email,
      title: body.title,
      content: body.content,
      image: body.image,
      hashtags: body.hashtags,
    },
  });

  return NextResponse.json(post, { status: 200 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") as string;
  const limit = searchParams.get("limit") as string;
  // const id = searchParams.get("id") as string;
  const userId = searchParams.get("userId") as string;

  if (page) {
    const count = await prisma.post.count();
    const skipPage = parseInt(page) - 1;
    try {
      const posts = await prisma.post.findMany({
        orderBy: { id: "asc" },
        take: parseInt(limit),
        skip: skipPage * parseInt(limit),
        where: userId ? { user: { id: parseInt(userId) } } : {},
        select: {
          id: true,
          title: true,
          content: true,
          image: true,
          hashtags: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              image: true,
              name: true,
            },
          },
        },
      });

      return NextResponse.json(
        {
          page: parseInt(page),
          data: posts,
          totalCount: count,
          totalPage: Math.ceil(count / 10),
        },
        {
          status: 200,
        },
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
      return NextResponse.error();
    }
  }
}
