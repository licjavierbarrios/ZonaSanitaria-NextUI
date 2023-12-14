import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      correo: string;
      token: string;
    };
  }
}
