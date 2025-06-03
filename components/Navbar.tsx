"use client";

import { useCartStore } from "@/store/cart-store";
import { ClerkLoaded, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { SlBasket } from "react-icons/sl";
import { Button } from "./ui/button";



const Navbar = () => {
    
    //clerk user
    const { user } = useUser();


    //Hamburger menu 
    const [isOpen, setIsOpen] = useState(false); 
   
  //basket count 
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);


  return (
    <nav className=" bg-white text-white shadow-md flex justify-between items-center px-6 py-4 ">
       
       {/* hamburger menu */}
      <div className="flex items-center justify-between">
         <div className="flex items-center space-x-2">
            <div className="text-gray-700 md:hidden text-2xl">
              <RiMenu3Fill onClick={() => setIsOpen(true)} />
            </div>


             {/* logo */}
            <div className="text-2xl font-bold text-red-500">
              <Link href="/">Marsh</Link>
            </div>
         </div>

              {/*Search bar*/}
           <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-4 py-2 w-34 mx-2">
             <input
            type="text"
            placeholder="Search products"
            className="bg-transparent flex-grow text-sm text-gray-800 focus:outline-none placeholder:text-gray-400"
            />
            </div>

          {/* basket */}
          <Link href="/checkout" className=" relative text-gray-700   hover:text-red-400 transition-colors md:hidden">
          <SlBasket className="w-6 h-6" />
             {cartCount > 0 && <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
          </Link>
      </div>


      {/*links */}
      <div className="space-x-6 text-gray-700 font-medium hidden md:flex">
       <Link href="/" className="hover:text-red-400 transition-colors">
          Home
        </Link> 
        <Link href="/product" className="hover:text-red-400 transition-colors">
          Product
        </Link> 
       <Link href="/contact" className="hover:text-red-400 transition-colors">
          Contact
        </Link>
       <Link href="/checkout" className="relative hover:text-red-400 transition-colors">
          <SlBasket className="w-6 h-6" />
          {cartCount > 0 && <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
        </Link>
      </div>

      {/*sign up */}
      <ClerkLoaded>
        {user ? (
             <div className="text-gray-700">

                    <div className=" text-xs">
                        <p className="text-gray-400">Wellcome Back</p>
                        <p className="font-bold">{user.fullName}</p>
                    </div>
             </div>
                ) : (
             <div className="text-gray-700 pl-4">
                <SignInButton mode="modal" >
                  <Button className="bg-red-500 text-white px-4 py-2   rounded hover:bg-red-700 transition-colors">
                    Sign Up
                  </Button>
                </SignInButton>
            </div>
           )}
       </ClerkLoaded>





          {/* ...............mobile menu........... */}

      { isOpen && (<div
        className="md:hidden bg-red-400 fixed top-0 left-0 z-[100] bottom-0 w-72 h-screen p-6  transition-all duration-500 overflow-hidden"
      >
        <button className="ml-auto block text-2xl">
          <RxCross2 onClick={() => setIsOpen(false)}  />
        </button>

        <ul className="grid grid-cols-1 gap-6 justify-center items-center m-20 font-medium text-gray-700">
          <Link href="/"> Home </Link>
          <Link href="/product">Product</Link>
          <Link href="/contact">Contact</Link>
        </ul>
      </div>)}
    </nav>
  );
};

export default Navbar;
