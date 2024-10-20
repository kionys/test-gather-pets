import prisma from "../../../../db";

interface RequestBody {
  id: number;
  image?: string | null;
}

export async function PUT(request: Request) {
  // request.json() 형식으로 body 부분 추출
  const body: RequestBody = await request.json();

  const user = await prisma.user.update({
    data: {
      image: body.image,
    },
    where: {
      id: body.id,
    },
  });

  const { ...result } = user;
  return new Response(JSON.stringify(result));
}
