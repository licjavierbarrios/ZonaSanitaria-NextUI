import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        correo: { label: "Correo", type: "text", placeholder: "Correo" },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "*****",
        },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              correo: credentials?.correo,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const user = await res.json();

        if (res.status === 400) {
          if (user.msg) {
            throw new Error(user.msg);
            // return { error: user.msg }
          } else {
            throw new Error("Error de autenticación desconocido");
            // return { error: "Error de autenticación desconocido" };
          }
        }

        if (user.msg) {
          throw new Error(user.msg);
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }: any) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }: any) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthOptions;


