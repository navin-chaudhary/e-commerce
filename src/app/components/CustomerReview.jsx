'use client';

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const CustomerReviews = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: 'Floyd Miles',
      image: '/images/customer1.png',
      rating: 3.5,
      review: 'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    },
    {
      id: 2,
      name: 'Ronald Richards',
      image: '/images/customer2.png',
      rating: 4,
      review: 'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    },
    {
      id: 3,
      name: 'Savannah Nguyen',
      image: '/images/customer3.png',
      rating: 3.5,
      review: 'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    },
    {
      id: 4,
      name: 'Jane Cooper',
      image: '/images/customer4.png',
      rating: 5,
      review: 'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    },
    {
      id: 5,
      name: 'Jane Cooper',
      image: '/images/customer1.png',
      rating: 5,
      review: 'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    },
    {
      id: 6,
      name: 'Jane Cooper',
      image: '/images/customer2.png',
      rating: 5,
      review: 'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    },

  ];

  const scrollToSlide = (index) => {
    if (containerRef.current) {
      const slideWidth = 316; // 300px card width + 16px gap
      containerRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
      setActiveSlide(index);
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const slideWidth = 316;
      const scrollPosition = containerRef.current.scrollLeft;
      const newActiveSlide = Math.round(scrollPosition / slideWidth);
      setActiveSlide(newActiveSlide);
    }
  };

  const scrollLeft = () => {
    const newIndex = Math.max(0, activeSlide - 1);
    scrollToSlide(newIndex);
  };

  const scrollRight = () => {
    const newIndex = Math.min(reviews.length - 1, activeSlide + 1);
    scrollToSlide(newIndex);
  };

  const ReviewCard = ({ review }) => (
    
    <div className="min-w-[300px] p-6 bg-white rounded-lg shadow-sm border border-gray-100 transform transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={review.image} 
          alt={review.name} 
          height={1000}
          width={1000}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-gray-900">{review.name}</h3>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(review.rating)
                    ? 'text-yellow-400'
                    : index < review.rating
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                } transition-colors duration-300`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm">{review.review}</p>
    </div>
  );

  return (
    <div className='bg-white'>
    <div className="w-full max-w-[1380px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Customers Review</h2>
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={activeSlide === 0}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={activeSlide === reviews.length - 1}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar mb-6"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === activeSlide 
              ? 'bg-gray-800 w-6' 
              : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default CustomerReviews;