import bcrypt from "bcryptjs";
import prisma from "../../../../db";

interface RequestBody {
  name: string;
  email: string;
  image?: string;
  password: string;
}

export async function POST(request: Request) {
  // request.json() 형식으로 body 부분 추출
  const body: RequestBody = await request.json();

  // DB User 테이블에 데이터 넣기
  const user = await prisma.user.create({
    data: {
      name: body.name,
      image: body.image,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  });

  // user 객체에서 password 부분을 제외하고 나머지 부분만 최종적으로 response 해주기
  const { password, ...result } = user;
  return new Response(JSON.stringify(result));
}
