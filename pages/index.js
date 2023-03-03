import Banner from "@/components/Banner/Banner.js";
import Header from "@/components/Header/Header.js";
import ProductFeed from "@/components/ProductFeed/ProductFeed.js";
import Head from "next/head";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      {/* Header */}
      <Header />
      <main className="max-w-screen-xl mx-auto">
        {/* Banner */}

        <Banner />

        {/* Product Feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const products = await fetch("http://fakestoreapi.com/products");

  const data = await products.json();

  return {
    props: {
      products: data,
    },
  };
};
