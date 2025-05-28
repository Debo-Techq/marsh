
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 20,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.data.map((product) => {
        const price = product.default_price as Stripe.Price;
        return (
          <Link href={`/product/${product.id}`}
            key={product.id}
            className="border rounded-lg shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <div>
              {product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                {product.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                )}
                <p className="text-gray-800 font-bold">
                  {price.unit_amount ? `$${(price.unit_amount / 100).toFixed(2)}` : "Price not available"}

                </p>
              </div>
            </div>

            <div className="px-4 pb-4 mt-auto">
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                Add to Cart
              </Button>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
