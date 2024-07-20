"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Index = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="text-6xl font-bold">Welcome to MIC</div>
      <button
        onClick={() => {
          router.push("/join");
        }}
        className="text-2xl font-semibold bg-black px-6 py-3 my-4 cursor-pointer text-white rounded-xl"
      >
        Join Now
      </button>
    </div>
  );
};

export default Index;
