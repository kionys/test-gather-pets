import prisma from "@/app/db";
import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid email profile", // Ensure these scopes are included
        },
      },
      profile: profile => {
        return {
          id: profile.sub, // Map the sub field to id
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error("이메일 또는 비밀번호가 누락되었습니다.");
        }

        // Prisma를 사용하여 이메일로 사용자 찾기
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("이 이메일에는 사용자가 없습니다.");
        }

        // 비밀번호 비교
        const isPasswordValid = await bcrypt.compare(password, user.password!);

        if (!isPasswordValid) {
          throw new Error("잘못된 비밀번호");
        }

        // 인증 성공 시 사용자 정보 반환
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      // 사용자가 이미 존재하는지 확인
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      // 사용자가 없다면
      if (!existingUser) {
        await prisma.user.create({
          data: {
            // id는 자동 생성됨
            email: user.email,
            name: user.name,
            image: user.image,
          },
        });
      }
      // 로그인 성공
      return true;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
