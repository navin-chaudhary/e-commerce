"use client";
import React, { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CartClient = () => {
  const { cartItems = [], removeFromCart, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState("");

  const calculateSubTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (Number(item?.price) || 0) * (item?.quantity || 1),
      0
    );
  };

  const formatPrice = (price) => {
    const safePrice = Number(price) || 0;
    return safePrice.toFixed(0);
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="space-y-6">
          
            <div className="hidden md:grid grid-cols-6 text-sm font-medium text-gray-700 bg-[#F1FDFB] p-4 rounded-lg mb-4">
              <div className="col-span-2">PRODUCT DETAILS</div>
              <div className="text-center">PRICE</div>
              <div className="text-center">QUANTITY</div>
              <div className="text-center">SHIPPING</div>
              <div className="text-right flex items-center justify-between">
                <span>SUBTOTAL</span>
                <span>ACTION</span>
              </div>
            </div>

            
            <div className="md:hidden text-sm font-medium text-gray-700 bg-[#F1FDFB] p-4 rounded-lg mb-4">
              <div className="text-center">YOUR SHOPPING CART</div>
            </div>

            <div className="w-full space-y-4">
        
              <div className="hidden md:block">
                {cartItems.map((item) => (
                  <div
                    key={item?.id || Math.random()}
                    className="grid grid-cols-6 items-center py-4 border-b"
                  >
                    <div className="col-span-2 flex gap-4">
                      <div className="w-20 h-20 rounded overflow-hidden">
                        <Image
                          src={item?.image || "/api/placeholder/80/80"}
                          alt={item?.title || "Product"}
                          width={80}
                          height={80}
                          className="object-cover h-20 w-20"
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium text-gray-900">{item?.title || "Untitled Product"}</h3>
                        <p className="text-sm text-gray-500">Color: {item?.color || "N/A"}</p>
                        <p className="text-sm text-gray-500">Size: {item?.size || "N/A"}</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <span className="text-gray-400">
                        ${formatPrice(item?.price)}
                      </span>
                    </div>

                    <div className="flex justify-center">
                      <div className="flex items-center bg-gray-100 rounded-md">
                        <button
                          onClick={() => updateQuantity(item?.id, (item?.quantity || 1) - 1)}
                          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                          disabled={(item?.quantity || 1) <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center text-black">
                          {item?.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item?.id, (item?.quantity || 1) + 1)}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="text-center text-teal-500">FREE</div>

                    <div className="text-right flex items-center justify-between">
                      <span className="text-gray-400">
                        ${formatPrice((item?.price || 0) * (item?.quantity || 1))}
                      </span>
                      <button
                        onClick={() => removeFromCart(item?.id)}
                        className="text-teal-500 hover:text-teal-600 p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

             
              <div className="md:hidden">
                {cartItems.map((item) => (
                  <div
                    key={item?.id || Math.random()}
                    className="bg-white rounded-lg shadow-sm p-4 mb-4"
                  >
                    <div className="flex gap-4 mb-4">
                      <div className="w-24 h-24 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item?.image || "/api/placeholder/96/96"}
                          alt={item?.title || "Product"}
                          width={96}
                          height={96}
                          className="object-cover h-24 w-24"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{item?.title || "Untitled Product"}</h3>
                        <p className="text-sm text-gray-500">Color: {item?.color || "N/A"}</p>
                        <p className="text-sm text-gray-500">Size: {item?.size || "N/A"}</p>
                        <p className="text-sm text-gray-400 mt-2">Price: ${formatPrice(item?.price)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-center mt-4">
                      <div className="flex items-center bg-gray-100 rounded-md">
                        <button
                          onClick={() => updateQuantity(item?.id, (item?.quantity || 1) - 1)}
                          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                          disabled={(item?.quantity || 1) <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center text-black">
                          {item?.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item?.id, (item?.quantity || 1) + 1)}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-center">
                        <span className="text-teal-500">FREE</span>
                      </div>

                      <div className="flex items-center justify-end gap-4">
                        <span className="text-gray-400">
                          ${formatPrice((item?.price || 0) * (item?.quantity || 1))}
                        </span>
                        <button
                          onClick={() => removeFromCart(item?.id)}
                          className="text-teal-500 hover:text-teal-600 p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           
            {(!cartItems || cartItems.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <p className="text-gray-500 mb-8">
                  Add some items to your cart to see them here!
                </p>
                <button className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors">
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>

        
        {cartItems?.length > 0 && (
          <div className="bg-[#F8FAFC] w-full px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                
                <div className="space-y-4 py-5">
                  <h3 className="text-base lg:text-xl font-bold text-gray-900">
                    Discount Codes
                  </h3>
                  <p className="text-black">Enter your coupon code if you have one</p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-md">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 border rounded-md sm:rounded-r-none px-3 py-2 text-sm"
                      placeholder="Enter coupon code"
                    />
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md sm:rounded-l-none hover:bg-teal-600 text-sm">
                      Apply Coupon
                    </button>
                  </div>
                  <button className="text-teal-500 border border-teal-500 px-4 py-2 rounded-md hover:bg-teal-50 text-sm w-full sm:w-auto">
                    Continue Shopping
                  </button>
                </div>

                
                <div className="w-full max-w-md mx-auto">
                  <div className="bg-[#F1FDFB] border rounded-lg p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-gray-700">
                        <span className="text-sm">Sub Total</span>
                        <span className="font-medium">
                          Rs.{formatPrice(calculateSubTotal())}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-gray-700">
                        <span className="text-sm">Shipping</span>
                        <span className="font-medium">Rs.00</span>
                      </div>

                      <div className="pt-4 border-t border-dashed border-teal-200">
                        <div className="flex items-center justify-between text-gray-900">
                          <span className="font-medium">Grand Total</span>
                          <span className="font-bold">
                            Rs.{formatPrice(calculateSubTotal())}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-px bg-teal-200"></div>

                    <div className="flex justify-center">
                      <button
                        className="w-full md:w-auto bg-teal-500 text-white font-medium py-3 px-8 rounded-md 
                        hover:bg-teal-600 transition-colors duration-200 focus:outline-none 
                        focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                      >
                        Proceed To Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartClient;