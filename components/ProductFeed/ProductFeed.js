import React from "react";
import Product from "../Product/Product.js";

const ProductFeed = ({ products }) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto ">
      {products.slice(0, 4).map((product) => {
        const { id, title, price, description, category, image } = product;
        return (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        );
      })}
      <img
        className="md:col-span-full"
        src="https://imgeng.jagran.com/images/2022/sep/Amazon%20Great%20Indian%20Festival%20Sale%2020221663876861914.jpg"
        alt="dy2"
        width="100%"
        height="auto"
      />

      {products.slice(5, products.length).map((product) => {
        const { id, title, price, description, category, image } = product;
        return (
          <Product
            key={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        );
      })}
    </div>
  );
};

export default ProductFeed;
