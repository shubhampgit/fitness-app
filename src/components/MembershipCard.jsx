import React from "react";

const MembershipCard = ({ membership }) => {

  const startDate = new Date(membership.start_date);
  const expiryDate = new Date(membership.expiry_date);

  const today = new Date();

  const daysLeft = Math.ceil(
    (expiryDate - today) / (1000 * 60 * 60 * 24)
  );

  const status = daysLeft > 0 ? "Active" : "Expired";

  return (

    <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md">

      <h2 className="text-2xl font-semibold mb-4">
        Your Membership
      </h2>

      <p className="text-gray-400 text-sm">Plan</p>
      <p className="text-lg font-bold mb-4">
        {membership.plan_name}
      </p>

      <p className="text-gray-400 text-sm">Price</p>
      <p className="mb-4">₹{membership.price}</p>

      <div className="flex justify-between mb-4">

        <div>
          <p className="text-gray-400 text-sm">Start Date</p>
          <p>{startDate.toDateString()}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Expiry Date</p>
          <p>{expiryDate.toDateString()}</p>
        </div>

      </div>

      <div className="flex justify-between items-center">

        <span className={`px-3 py-1 rounded-full text-sm
        ${status === "Active"
          ? "bg-green-500 text-black"
          : "bg-red-500 text-white"}
        `}>
          {status}
        </span>

        <span className="text-gray-400">
          {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
        </span>

      </div>

    </div>

  );
};

export default MembershipCard;