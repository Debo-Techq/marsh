"use client"

import Stripe from "stripe";
import Image from "next/image";
import { useCartStore } from"@/store/cart-store";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
    const { items , addItem, removeItem  } = useCartStore();
   const cartItem = items.find((item) => item.id === product.id);
   const quantity = cartItem ? cartItem.quantity : 0;

   const onAddItem = () => {
      addItem({
        id: product.id,
        name: product.name,
        price: price.unit_amount as number,
        imageUrl: product.images ? product.images[0] : null,
        quantity: 1,
      })
   }

  const price = product.default_price as Stripe.Price;


  return (
    <div className="container mx-auto px-4 py-8 flex flex-col    md:flex-row gap-8 items-center">
      {/* Product Image */}
       {product.images[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
       <Image
        src={product.images[0]}
        alt={product.name}
        width={400}
        height={300}
        className="w-full h-48 object-cover rounded mb-4"
         />
         </div>
         )}

      {/* Product Info */}
      <div className="md:w-1/2">
         <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
      
        {product.description && (
          <p className="text-gray-600 mb-4">{product.description}</p>
        )}
      
        <p className="text-xl font-semibold text-gray-900 mb-4">
          ${(price.unit_amount! / 100).toFixed(2)}
        </p>

        {/* Quantity Selector */}
        <div>
          <Button variant="outline"
          onClick={() => removeItem(product.id)}>
           -
          </Button>

          <span className="text-lg font-semibold"> {quantity} </span>
          <Button
            onClick={onAddItem}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
