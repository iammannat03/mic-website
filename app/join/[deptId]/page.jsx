import { deptDetails } from "@constants";
import React from "react";

const DeptDetails = ({ params }) => {
  const deptDesc = deptDetails.find((dept) => dept.id === params.deptId);
  return (
    <div className="flex flex-col flex-center mt-12">
      <p className="text-3xl font-semibold">{deptDesc.name}</p>
      <p className="text-xl ">{deptDesc.desc}</p>
    </div>
  );
};

export default DeptDetails;
