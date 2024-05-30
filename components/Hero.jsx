"use client";
import { useSession } from "next-auth/react";

const Hero = () => {
  const { data: session } = useSession();
  return (
    <div className="text-2xl font-bold text-center mx-auto">
      Mera naam??
      <br />
      {session?.user
        ? `Mera naam ${session?.user.name} hai`
        : "Main nahi bataunga"}
    </div>
  );
};

export default Hero;
