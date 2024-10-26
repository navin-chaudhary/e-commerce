'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ percentage, description }) => (
  <div className="w-full p-6 rounded-lg bg-slate-100 flex flex-col justify-center items-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{percentage}</h2>
    <p className="text-sm md:text-base text-gray-600 text-center">{description}</p>
  </div>
);

export default function StatsPage() {
  const items = [
    { id: 1, percentage: '95%', description: 'Happy Customer' },
    { id: 2, percentage: '1 Million+', description: 'Yearly Sale' },
    { id: 3, percentage: '20k+', description: 'Customer Rating' },
  ];

  return (
    <div className="w-full  bg-white p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {items.map((item) => (
            <StatsCard
              key={item.id}
              percentage={item.percentage}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}