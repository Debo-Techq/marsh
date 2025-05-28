"use client"

import React, { useState } from 'react'

const ContactPage = () => {
    const [result, setResult] = useState("");
    


  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    

    // Append Web3Forms access key from NEXT_PUBLIC env variable
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORM_KEY || "");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message sent successfully!");
      form.reset();
    } else {
      setResult("Oops! Something went wrong.");
    }
  };


  return (
    <div className=" flex flex-col justify-center items-center px-      [54px] mb-20">
        <h1 className="flex justify-center text-3xl md:text-5xl font-bold mb-2">
         Contact <span className="font-light">With Us</span></h1>
        <form onSubmit={onSubmit} className="max-w-2xl mt-10 ">
           <div className="flex flex-wrap ">
               <div className="w-full md:w-1/2">
                  Your Name 
                  <input className="w-full border border-gray-300 rounded-[10px] py-3 px-4 mt-2" 
                  type="text" name="Name" placeholder="Enter Your Name" required/>
               </div>
               <div className="w-full md:w-1/2 md:pl-4">
                  Your Email 
                  <input className="w-full border border-gray-300 rounded-[10px] py-3 px-4 mt-2" 
                  type="email" name="Email" placeholder="Enter Your Email" required/>
               </div>
            </div>
            <div className="my-6">
               Message
               <textarea className="w-full border border-gray-300 rounded-[10px] h-48 py-3 px-4 mt-2 resize-none" name="Message" placeholder="Message" required></textarea>
            </div>
            <button className="bg-amber-500 hover:bg-amber-400 text-white py-3 px-12 rounded-[10px] block mx-auto mb-10 cursor-pointer">
               {result ? result : "Send Message"}
            </button>
        </form> 
    </div>
  )
}

export default ContactPage
