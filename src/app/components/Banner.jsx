import Image from "next/image";
import React from "react";

const PromoBanner = () => {
  return (
    <div className="p-2 md:p-6 lg:p-16 bg-[#f1fdfb]">
      <div className="relative bg-gradient-to-r from-teal-800 to-teal-600  rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/bannerbg.jpeg')] bg-no-repeat bg-cover"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="max-w-xl   lg:pl-16 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white pt-14 pb-8">
              Lorem ipsum
              <br />
              dolor sit.
            </h1>
            <p className="text-gray-100 mb-8 p-2 max-w-xl">
              Lorem ipsum dolor sit amet consectetur. Varius eu sed adipiscing
              pellentesque feugiat gravida tincidunt lobortis mi. Nisi
              sollicitudin in dictumst elementum amet nulla. Malesuada tempor
              consequat dui fringilla pretium. Egestas nibh et sociis enim nisl
              aliquet ultrices.
            </p>
            <button className="bg-white mb-16 text-teal-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Buy Now
            </button>
          </div>

          {/* Image Section */}
          <div className="absolute left-[40%] max-w-lg pt-8 ">
            <Image
              src="/images/girls.png"
              alt="Two models in summer clothing"
              className="w-full h-[450px]  rounded-lg mr-10"
              width={1000}
              height={1000}
            />
            
          </div>
          <div className="absolute top-0 right-6   flex items-center justify-center ">
              <span className="text-[350px]">
              ★
              </span>
              <div className="text-4xl rotate-12 pl-[25px] mt-[20px] absolute font-bold  text-teal-500">
                60% <br/> <span className="text-4xl rotate-12">off</span>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
