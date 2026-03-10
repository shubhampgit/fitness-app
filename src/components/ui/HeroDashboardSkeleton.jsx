import React from "react";

const HeroDashboardSkeleton = () => {
  return (
    <div className="w-full min-h-[75vh] bg-black text-white">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center">

        {/* LEFT SIDE SKELETON */}
        <div className="flex flex-col justify-center px-16 py-12 space-y-4">

          <div className="h-10 w-72 shimmer rounded"></div>

          <div className="h-4 w-96 shimmer rounded"></div>
          <div className="h-4 w-80 shimmer rounded"></div>

          <div className="space-y-3 mt-4">
            <div className="h-4 w-64 shimmer rounded"></div>
            <div className="h-4 w-72 shimmer rounded"></div>
            <div className="h-4 w-60 shimmer rounded"></div>
            <div className="h-4 w-68 shimmer rounded"></div>
          </div>

          <div className="h-10 w-40 shimmer rounded-lg mt-6"></div>

        </div>

        {/* RIGHT SIDE BANNER SKELETON */}
        <div className="h-[75vh] w-full shimmer"></div>

      </div>
    </div>
  );
};

export default HeroDashboardSkeleton;