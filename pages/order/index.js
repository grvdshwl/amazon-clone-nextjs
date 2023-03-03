import React from "react";

const Order = ({ order }) => {
  const { id, amount, amountShipping, items, timestamp, images } = order;
  return (
    <div className="relative border-rounder-md">
      <div className="flex items-center"></div>
    </div>
  );
};

export default Order;
