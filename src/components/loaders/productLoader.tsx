import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductLoader() {
  return (
    <div>
      <Skeleton width={"200px"} height={"238px"} className="mb-3" />
      <Skeleton width={"100%"} height={"20px"} />
      <Skeleton width={"100%"} height={"20px"} />
      <Skeleton width={"100%"} height={"20px"} />
    </div>
  );
}
