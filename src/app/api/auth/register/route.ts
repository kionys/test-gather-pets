import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "../../../db";

export const POST = async (request: Request) => {
  const { name, email, password } = await request.json();

  try {
    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("이메일이 중복됨", {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return new NextResponse("회원가입 성공", {
      status: 201,
    });
  } catch (e: any) {
    return new NextResponse(e.message, {
      status: 500,
    });
  }
};
