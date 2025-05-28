"use client"


import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";

export default function  CheckoutPage () {

  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  );

  if (total === 0 || items.length === 0) {
    return ( 
      <div className="container mx-auto px-8 text-center"> 
         <h1 className="text-3xl font-bold mb-4"> Your Cart is Empty </h1>
      </div>

    )

  }
  return (
    <div className="container mx-auto px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold">Your Order Summary</h2>
        <ul className="space-y-4" >
         {items.map((item) => (
          <li key={item.id} className="flex flex-col gap-2 border-b pb-2" >
            <div className="flex justify-between items-center">
              <span className="font-medium">{item.name}</span>
              <span className="font-semibold">{((item.price * item.quantity) /100). toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => removeItem(item.id)} >
                -
              </Button>
              <span className="text-lg font-semibold">{item.quantity}</span>
              <Button onClick={() => addItem({...item, quantity: 1})}> + </Button>
            </div>
          </li>
         ))}
        </ul>
        <div className="mt-6 border-t pt-2 text-lg font-semibold">
          Total:${(total / 100).toFixed(2)}
        </div>
      </div>
      <form action={checkoutAction} className="max-w-md mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button type="submit" variant="default" className="w-full mt-4">Proceed to Payment</Button>
      </form>
    </div>

    )
}