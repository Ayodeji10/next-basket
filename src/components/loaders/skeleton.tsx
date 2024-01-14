import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  width: string | number;
  height: string | number;
  mb?: number;
};

export default function SkeletonLoader({ width, height, mb }: Props) {
  return <Skeleton width={width} height={height} className={`mb-${mb}`} />;
}
