'use client';
import { useState } from 'react';

export default function Statespage() {
  const items = [
    { id: 1, percentage: '95%', description: 'Happy Customer' },
    { id: 2, percentage: '1 Million+', description: 'Yearly Sale' },
    { id: 3, percentage: '20k+', description: 'Customer Rating' },
  ];

  return (
    <div className="flex justify-center items-center bg-white p-4 md:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl ">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg bg-[#f1f5f9] flex flex-col justify-center items-center w-96  p-6 shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{item.percentage}</h2>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
