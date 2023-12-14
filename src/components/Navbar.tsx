import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { HandMetal } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-zinc-100 py-2 border-b border-b-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <HandMetal />
        </Link>
        <Link className={buttonVariants()} href="/api/auth/signin">
          HOME
        </Link>
        <Link className={buttonVariants()} href="/api/auth/signout">
          CONFIG
        </Link>
        <Link className={buttonVariants()} href="/dashboard">
          DASHBOARD
        </Link>

        {session ? (
          <LogoutButton />
        ) : (
          <Link className={buttonVariants()} href="/sign-in">
            Iniciar seción
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
