"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface Props {
  products: Stripe.Product[];
}

const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descMatch = product.description?.toLowerCase().includes(term);
    return nameMatch || descMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
          Our Products
        </h1>

        <div className="mb-6 flex justify-center">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const price = product.default_price as any;
            return (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4"
              >
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded mb-4" />
                )}

                <h2 className="text-lg font-semibold text-gray-700">{product.name}</h2>

                {product.description && (
                  <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                )}

                <p className="text-gray-800 font-bold">
                  ${(price.unit_amount / 100).toFixed(2)}
                </p>

                <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                  Add to Cart
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
