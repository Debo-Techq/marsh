"use client";

import { usePathname } from "next/navigation";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Banner = () => {

  const pathname = usePathname();
   if (pathname !== "/") return null;

  return (
    <div className="relative max-w-screen-2xl mx-auto">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />

      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {bannerImages.map((image, index) => (
          <div key={index}>
            <img
              loading="lazy"
              src={image.src}
              alt={image.alt}
              className="h-64 w-full object-cover sm:h-80 md:h-[400px] lg:h-[450px]"
            />
          </div>
        ))}
       </Carousel>
    </div>
  );
};

export default Banner;


// Define a type for the image object
type BannerImage = {
  src: string;
  alt: string;
};

// Array of banner images
const bannerImages: BannerImage[] = [
  { src: "/images/banner_img_1.jpg", alt: "Banner 1" },
  { src: "/images/banner_img_2.jpg", alt: "Banner 2" },
  { src: "/images/banner_img_3.jpg", alt: "Banner 3" },
];


