"use client"
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="">
      <button
        className="w-full py-6 text-left flex justify-between items-center focus:outline-none hover:text-teal-500 transition-colors duration-300"
        onClick={onClick}
      >
        <span className="text-lg font-medium text-gray-900 flex-grow flex justify-between items-center rounded-md p-3 pr-4 bg-white">{question}
        <span className="flex-shrink-0">
          {isOpen ? (
            <Minus className="w-5 h-5 text-teal-500" />
          ) : (
            <Plus className="w-5 h-5 text-teal-500" />
          )}
        </span>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 mb-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600 pr-8">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      question: "1.Lorem ipsum dolor sit amet consectetur quam ipsum aliquam tortor non nullam ?",
      answer: "Lorem ipsum dolor sit amet consectetur. Nulla pellentesque vitae id molestie integer viverra fermentum turpis tellus. Condimentum integer elementum euismod ultrices vulputate vitae amet tincidunt. Sed lorem facilisis ultricies euismod in. Cras imperdiet pellentesque facilisis at. Iaculis tellus vitae enim velit. Tortor quis in ipsum amet nam lacus."
    },
    {
      question: "2.Lorem ipsum dolor sit amet consectetur quam ipsum aliquam tortor non nullam ?",
      answer: "Lorem ipsum dolor sit amet consectetur. Nulla pellentesque vitae id molestie integer viverra fermentum turpis tellus. Condimentum integer elementum euismod ultrices vulputate vitae amet tincidunt."
    },
    {
      question: "3.Lorem ipsum dolor sit amet consectetur quam ipsum aliquam tortor non nullam ?",
      answer: "Lorem ipsum dolor sit amet consectetur. Nulla pellentesque vitae id molestie integer viverra fermentum turpis tellus. Condimentum integer elementum euismod ultrices vulputate vitae amet tincidunt."
    },
    {
      question: "4.Lorem ipsum dolor sit amet consectetur quam ipsum aliquam tortor non nullam ?",
      answer: "Lorem ipsum dolor sit amet consectetur. Nulla pellentesque vitae id molestie integer viverra fermentum turpis tellus. Condimentum integer elementum euismod ultrices vulputate vitae amet tincidunt."
    }
  ];

  return (
    <div className='bg-[#F8FAFC]'>
    <div className="max-w-[1380px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h1>
      <div className="space-y-1 divide-y divide-gray-200">
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            isLast={index === faqData.length - 1}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default FAQ;