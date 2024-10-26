"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const PopularBrands = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const brands = [
    { id: 1, name: 'Converse', logo: '/images/brand1.png' },
    { id: 2, name: 'Adidas', logo: '/images/brand2.png' },
    { id: 3, name: 'Chanel', logo: '/images/brand3.png' },
    { id: 4, name: 'Puma', logo: '/images/brand4.png' },
    { id: 5, name: 'Skechers', logo: '/images/brand5.png' },
    { id: 6, name: 'Forever 21', logo: '/images/brand6.png' },
    { id: 7, name: 'Fila', logo: '/images/brand7.png' },
    { id: 8, name: 'Lacoste', logo: '/images/brand8.png' },
  ];

  useEffect(() => {
    if (isHovered) return;

    const animateScroll = () => {
      setScrollPosition((prev) => {
        const newPosition = prev + 1;
        return newPosition >= brands.length * 200 ? 0 : newPosition;
      });
    };

    const interval = setInterval(animateScroll, 30);
    return () => clearInterval(interval);
  }, [brands.length, isHovered]);

  return (
    <div className="w-full bg-white text-black py-12 px-4">
      <h2 className="text-3xl font-bold lg:ml-16 ml-2 lg:text-4xl mb-12">Popular Brands</h2>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex space-x-4 whitespace-nowrap">
          <div
            className="flex space-x-8"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
            }}
          >
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="inline-flex flex-col items-center justify-center min-w-[200px] h-36"
              >
                <Image
                  src={brand.logo}
                  height={1000}
                  width={1000}
                  alt={`${brand.name} logo`}
                  className="h-24 w-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>

          <div
            className="flex space-x-8 absolute left-full top-0"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
            }}
          >
            {brands.map((brand) => (
              <div
                key={`duplicate-${brand.id}`}
                className="inline-flex flex-col items-center justify-center min-w-[200px] h-36"
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="h-24 w-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  width={200}
                  height={200}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularBrands;
