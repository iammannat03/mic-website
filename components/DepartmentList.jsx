"use client";

import { deptList } from "@constants";
import { useRouter } from "next/navigation";
import React from "react";

const DepartmentList = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col bg-slate-400 text-white rounded-xl p-8">
      {deptList.map((items, i) => {
        return (
          <a
            key={i}
            className="font-bold text-2xl cursor-pointer"
            onClick={() => {
              router.push(`join/${items.id}`);
            }}
          >
            {items.name}
          </a>
        );
      })}
    </div>
  );
};

export default DepartmentList;
