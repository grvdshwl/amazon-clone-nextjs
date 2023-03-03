import { addToBasket, removeFromBasket } from "@/slices/basketSlice.js";
import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image.js";
import React from "react";
import { useDispatch } from "react-redux";

const CheckoutProduct = ({ product }) => {
  const { id, title, description, price, image, rating, hasPrime } = product;

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    //sending product to basket in store
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    //sending product to basket in store

    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5 m-5">
      {/* Left */}

      <Image
        src={image}
        height={200}
        width={200}
        style={{ objectFit: "contain" }}
        alt={title}
      />

      {/* Middle */}

      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill({})
            .map((_, i) => {
              return (
                <StarIcon key={Math.random()} className="h-5 text-yellow-500" />
              );
            })}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <div className="mb-5">
          <span className="text-bold">&#8377;{price}</span>
        </div>

        {hasPrime && (
          <div className="flex items-center space-x-2 mt-5">
            <img
              loading="lazy"
              src="https://links.papareact.com/fdw"
              alt="hasPrime"
              className="w-12"
            />
            <p className="text-xs text-gray-500">Free Next-day delivery</p>
          </div>
        )}
      </div>

      {/* Right */}

      <div className=" flex flex-col space-y-2 my-auto justify-self-end ">
        <button className="button mt-auto" onClick={addItemToBasket}>
          Add To Basket
        </button>
        <button className="button mt-auto" onClick={removeItemFromBasket}>
          Remove From Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
