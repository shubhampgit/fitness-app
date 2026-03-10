import React from "react";

const PlanDetailsSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white py-16">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6 animate-pulse">

        {/* LEFT IMAGE SKELETON */}
        <div className="w-full h-[420px] bg-gray-800 rounded-2xl"></div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6">

          {/* Title */}
          <div className="h-8 w-64 bg-gray-800 rounded"></div>

          {/* Price */}
          <div className="h-10 w-40 bg-gray-700 rounded"></div>

          {/* Features */}
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-800 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-800 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-800 rounded"></div>
            <div className="h-4 w-3/6 bg-gray-800 rounded"></div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gray-700"></div>

          {/* Button */}
          <div className="h-12 w-48 bg-gray-700 rounded-xl"></div>

        </div>

      </div>

    </div>
  );
};

export default PlanDetailsSkeleton;