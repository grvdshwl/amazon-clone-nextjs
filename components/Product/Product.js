import { addToBasket } from "@/slices/basketSlice.js";
import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const MAX_RATING = 5;
const MIN_RATING = 1;

let randomRating = () =>
  Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING;

const Product = ({ id, title, price, description, category, image }) => {
  const [rating, setRating] = useState(3);
  const [hasPrime, setHasPrime] = useState(false);
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      description,
      price,
      category,
      image,
      rating,
      hasPrime,
    };

    //sending product to basket in store
    dispatch(addToBasket(product));
  };

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
        alt="img"
      />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill({})
          .map((_, i) => {
            return <StarIcon key={i} className="h-5 text-yellow-500" />;
          })}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <span className="text-bold">${price}</span>
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 mt-5">
          <img
            src="https://links.papareact.com/fdw"
            alt="fdw"
            className="hasPrime"
          />
          <p className="text-xs text-gray-500">Free Next-day delivery</p>
        </div>
      )}

      <button className="mt-auto button" onClick={addItemToBasket}>
        Add To Basket
      </button>
    </div>
  );
};

export default Product;
