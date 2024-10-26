"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Search, User, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { cartItems } = useCart(); 

  const cartItemCount =  cartItems?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    {
      name: "Electronics",
      subcategories: ["Phones", "Laptops", "Tablets", "Accessories"],
    },
    {
      name: "Fashion",
      subcategories: ["Men's Clothing", "Women's Clothing", "Kids", "Shoes"],
    },
    {
      name: "Home & Living",
      subcategories: ["Furniture", "Decor", "Kitchen", "Bath"],
    },
    {
      name: "Books",
      subcategories: ["Fiction", "Non-Fiction", "Educational", "Comics"],
    },
  ];

  return (
    <nav className="bg-white shadow-sm z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-full">
              <Image
                src="/images/logo.png"
                alt="Logo"
                className="object-cover scale-105"
                priority
                fill
              />
            </div>
            <Link href="/" className="flex items-center">
              <span className="text-teal-500 text-3xl font-extrabold">
                Logo
              </span>
            </Link>
          </div>
          
         
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <div className="relative group">
              <button
                className="text-gray-600 hover:text-gray-900 inline-flex items-center"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

             
              {isCategoryOpen && (
                <div
                  className="absolute left-0 mt-2 w-screen max-w-screen-sm bg-white border rounded-lg opacity-100 shadow-lg py-4"
                  onMouseLeave={() => setIsCategoryOpen(false)}
                >
                  <div className="grid grid-cols-2 px-6 opacity-100">
                    {categories.map((category) => (
                      <div key={category.name} className="space-y-4 z-50 bg-white">
                        <h3 className="text-sm font-semibold bg-white text-gray-900 mt-1">
                          {category.name}
                        </h3>
                        <ul className="space-y-2 bg-white">
                          {category.subcategories.map((sub) => (
                            <li key={sub}>
                              <Link href={"/"} className="text-sm text-gray-600 hover:text-gray-900 bg-white">
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Explore
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Contact Us
            </Link>
          </div>

         
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-[#ebf0f5] p-3 rounded-md text-gray-600 hover:text-gray-900">
              <Search className="h-5 w-5" />
            </button>
            <button className="bg-[#ebf0f5] p-3 rounded-md text-gray-600 hover:text-gray-900">
              <User className="h-5 w-5" />
            </button>
            <button className="bg-[#ebf0f5] p-3 rounded-md text-gray-600 hover:text-gray-900 relative">
              <Link href={"/cart"}>
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </div>
                )}
              </Link>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Home
              </Link>
              
             
              {cartItemCount === 0 && (
                <div className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5 text-teal-500" />
                  </Link>
                </div>
              )}

              <div className="space-y-2">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  Categories
                  <ChevronDown className={`h-4 w-4 transform ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>

                {isCategoryOpen && (
                  <div className="pl-6 space-y-2">
                    {categories.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <p className="font-semibold text-sm text-gray-900 px-3 py-1">
                          {category.name}
                        </p>
                        {category.subcategories.map((sub) => (
                          <Link key={sub} href={`/category/${sub.toLowerCase()}`} className="block px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                            {sub}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/explore" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Explore
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/blog" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Blog
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Contact Us
              </Link>
              <button className="bg-[#ebf0f5] p-3 rounded-md text-gray-600 hover:text-gray-900 relative">
              <Link href={"/cart"}>
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </div>
                )}
              </Link>
            </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
