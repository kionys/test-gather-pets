import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import prisma from "../db";

// https://velog.io/@yejine2/Next.js-App-Router%EC%97%90%EC%84%9C-authOptions-%EA%B4%80%EB%A0%A8-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0
export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // jwt 암호화 서명
  session: {
    strategy: "jwt", // jwt 기반의 session을 사용
    maxAge: 60 * 60 * 24, // 24시간으로 설정
    // maxAge: 1, // 1분으로 설정 후 테스트 진행
    updateAge: 60 * 60 * 2, // session 업데이트 주기, 2시간으로 설정
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    // 이메일과 패스워드 방식으로 사용자가 직접 DB 부분을 컨트롤할 수 있음
    CredentialsProvider({
      name: "Credentials",

      // 로그인 form 내용
      credentials: {
        email: { label: "이메일", type: "text", placeholder: "이메일 입력" },
        password: { label: "비밀번호", type: "password" },
      },

      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL as string}/api/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        console.log(user);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true, // 계정간 이메일 값이 동일할 경우 예외처리 | https://next-auth.js.org/configuration/providers/oauth#allowdangerousemailaccountlinking-option
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/users/login", // signIn 함수를 실행하면 /users/login로 리다이렉트 시킨다.
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    // jwt: async ({ user, token }) => {
    //   if (user) {
    //     token.sub = user.id;
    //   }
    //   return token;
    // },
    jwt: async ({ user, token, trigger, account, session }) => {
      if (user && account) {
        await prisma.user.update({
          where: { id: parseInt(user.id) },
          data: { authType: account.provider },
        });

        token.sub = user.id;
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      if (trigger === "update" && session?.image) {
        token.picture = session.image;
      }
      // console.log("세션 데이터:", session);
      // console.log("업데이트된 토큰:", token);
      return token;
    },
  },
};
