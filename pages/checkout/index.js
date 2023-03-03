import CheckoutProduct from "@/components/CheckoutProduct/CheckoutProduct.js";
import Header from "@/components/Header/Header.js";
import { selectItems, selectItemsTotal } from "@/slices/basketSlice.js";
import Image from "next/image.js";
import React from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const { data: session, status } = useSession();

  const items = useSelector(selectItems);
  const total = useSelector(selectItemsTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    //call the backend to create a checkout session.

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    //Redirect user to stripe checkout

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div>
      <Header />
      <main className="lg:flex max-w-screen-xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            style={{ objectFit: "contain" }}
            alt="abj"
          />
          <div className="flex flex-col p-5 space-v-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your amazon shopping basket is empty."
                : "Shopping Basket"}
            </h1>

            {items.map((item) => {
              return <CheckoutProduct key={item.id} product={item} />;
            })}
          </div>
        </div>

        {/* Right */}

        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal({items.length} items):{" "}
                <span className="font-bold mx-2">
                  <span className="text-bold">&#8377;{total}</span>
                </span>
                <button
                  onClick={createCheckoutSession}
                  disabled={!session}
                  className={`link button mt-2 ${
                    !session &&
                    " from-gray-300 to-gray-500 border-gray-200 cursor-not-allowed"
                  } `}
                >
                  {!session ? "Sign in to checkout" : "Proceed to checkout"}
                </button>
              </h2>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
