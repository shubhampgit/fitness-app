import React, { useMemo } from "react";

const MembershipCard = ({ membership, scrollToPlans }) => {

  if (!membership) return null;

  const { start_date, expiry_date, plan_name, price } = membership;

  const { startDate, expiryDate, daysLeft, status } = useMemo(() => {

    const start = new Date(start_date);
    const expiry = new Date(expiry_date);
    const today = new Date();

    const remainingDays = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    return {
      startDate: start,
      expiryDate: expiry,
      daysLeft: remainingDays,
      status: remainingDays > 0 ? "Active" : "Expired"
    };

  }, [start_date, expiry_date]);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md text-black dark:text-white">

      <h2 className="text-2xl font-semibold mb-4">
        Your Membership
      </h2>

      <p className="text-gray-500 dark:text-gray-400 text-sm">
        Plan
      </p>

      <p className="text-lg font-bold mb-4">
        {plan_name}
      </p>

      <p className="text-gray-500 dark:text-gray-400 text-sm">
        Price
      </p>

      <p className="mb-4">
        ₹{price}
      </p>

      <div className="flex justify-between mb-4">

        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Start Date
          </p>

          <p>{startDate.toDateString()}</p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Expiry Date
          </p>

          <p>{expiryDate.toDateString()}</p>
        </div>

      </div>

      <div className="flex justify-between items-center">

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
            ${
              status === "Active"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }
          `}
        >
          {status}
        </span>

        <span className="text-gray-500 dark:text-gray-400">
          {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
        </span>

      </div>

      <button
        onClick={scrollToPlans}
        className="mt-5 w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg font-semibold text-white transition"
      >
        Renew Membership
      </button>

    </div>
  );
};

export default MembershipCard;