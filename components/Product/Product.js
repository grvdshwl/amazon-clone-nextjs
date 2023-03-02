import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image.js";
import { useEffect, useState } from "react";
import Currency from "react-currency-formatter";

const MAX_RATING = 5;
const MIN_RATING = 1;

let randomRating = () =>
  Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING;

const Product = ({ title, price, description, category, image }) => {
  const [rating, setRating] = useState(3);
  const [hasPrime, setHasPrime] = useState(false);

  useEffect(() => {
    setRating(randomRating);
    setHasPrime(Math.random() < 0.5);
  }, []);

  return (
    <div className="relative m-4 bg-white z-30 p-6 flex flex-col ">
      <p className="absolute right-2 top-2 text-xs  italic text-gray-100">
        {category}
      </p>
      <Image
        src={image}
        width={200}
        height={200}
        style={{ objectFit: "contain" }}
      />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill({})
          .map((_, i) => {
            return <StarIcon id={i} className="h-5 text-yellow-500" />;
          })}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="GBP" />
      </div>

      {hasPrime ? (
        <div className="flex items-center space-x-2 mt-5">
          <img
            src="https://links.papareact.com/fdw"
            alt="fdw"
            className="w-12"
          />
          <p className="text-xs text-gray-500">Free Next-day delivery</p>
        </div>
      ) : (
        <span></span>
      )}

      <button className="mt-auto button"> Add To Basket</button>
    </div>
  );
};

export default Product;
