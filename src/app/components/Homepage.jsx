"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const ProductCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  
  const images = [
    "/images/shoes.jpeg",
    "/images/shoes2.jpeg",
    "/images/shoes3.jpeg"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className=" bg-[#f8fafc] flex items-center">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
          <div className="space-y-6 md:pl-0  lg:pl-24">
            <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 md:max-w-96 md:ml-0 lg:ml-9">
              Lorem ipsum dolor sit.
            </h1> 
            <p className="text-gray-600  lg:p-4 lg:pl-8">
              Lorem ipsum dolor sit amet consectetur. Varius eu sed adipiscing 
              pellentesque feugiat gravida tincidunt lobortis mi. Nisl sollicitudin in 
              dictumst elementum amet nulla. Malesuada tempor consequat dui fringilla 
              pretium. Egestas nibh et sociis enim nisi aliquet ultrices.
            </p>
            <div className="flex space-x-4 lg:ml-7">
              <button className="px-6 py-2 border-2 border-teal-500 text-teal-500 
                rounded-lg hover:bg-teal-500 hover:text-white duration-300 transition-colors">
                Explore
              </button>
              <button className="px-6 py-2 bg-teal-500 text-white rounded-lg 
                hover:bg-teal-600 transition-colors">
                Buy Now
              </button>
            </div>
          </div>

          
          <div className="relative group">
            <div className="overflow-hidden rounded-lg">
              <div className="relative w-full aspect-square">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute w-full h-full transition-opacity duration-500 ease-in-out
                      ${currentImageIndex === index ? 'opacity-1' : 'opacity-0'}`}
                  >
                    <Image
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full   object-cover"
                      height={1000}
                      width={1000}
                    />
                  </div>
                ))}
              </div>
            </div>

            
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={prevImage}
                className="bg-white/80 rounded-full p-2 opacity-85  transition-opacity"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="bg-[#14B8A6] rounded-full p-2 opacity-85  transition-opacity"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors
                    ${currentImageIndex === index ? 'bg-teal-500' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
