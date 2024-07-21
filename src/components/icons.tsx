import Image from "next/image";

export const Logo = () => {
  return (
    <div className="rounded-full bg-background p-2">
      <Image src="/logo.svg" alt="Logo" height={25} width={25} priority />
    </div>
  );
};
