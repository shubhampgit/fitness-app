import React from "react";

const PlanCardSkeleton = () => {
  return (
    <div className="p-8 rounded-3xl border border-gray-800 bg-gray-900/70 animate-pulse">

      {/* Plan title */}
      <div className="h-6 w-32 bg-gray-800 rounded mb-4"></div>

      {/* Price */}
      <div className="h-10 w-24 bg-gray-700 rounded mb-6"></div>

      {/* Features */}
      <div className="space-y-3 mb-8">
        <div className="h-4 w-full bg-gray-800 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-800 rounded"></div>
        <div className="h-4 w-4/6 bg-gray-800 rounded"></div>
        <div className="h-4 w-3/6 bg-gray-800 rounded"></div>
      </div>

      {/* Button */}
      <div className="h-10 w-full bg-gray-700 rounded-xl"></div>

    </div>
  );
};

export default PlanCardSkeleton;