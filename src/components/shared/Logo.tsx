import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" type="button">
      <Image
        src="/logo.png"
        alt="Zona Sanitaria III"
        width={100}
        height={100}
      />
    </Link>
  );
};

export default Logo;
