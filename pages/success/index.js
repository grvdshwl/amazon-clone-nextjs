import Header from "@/components/Header/Header.js";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/navigation.js";
import React from "react";

const Success = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen ">
      <Header />
      <main className="max-w-screen-lg mx-auto mt-5">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you! your order has been confirmed.
            </h1>
            <p>
              Thank you for shopping with us. we will send a confirmation of
              items shipped.
            </p>
            <button
              className="mt-8 button"
              onClick={() => {
                router.push("/orders");
              }}
            >
              Go To My Orders.
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Success;
