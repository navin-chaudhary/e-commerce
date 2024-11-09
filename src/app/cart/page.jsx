"use client";
import React, { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster, toast } from 'sonner';

const CartClient = () => {
  const { cartItems = [], removeFromCart, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState("");

  // Toast configuration object for consistent styling
  const toastConfig = {
    className: "bg-black text-white font-bold text-lg",
    duration: 2000,
  };

  const calculateSubTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (Number(item?.price) || 0) * (item?.quantity || 1),
      0
    );
  };

  const formatPrice = (price) => {
    const safePrice = Number(price) || 0;
    return safePrice.toFixed(2);
  };

  const handleRemoveFromCart = (itemId, itemTitle) => {
    removeFromCart(itemId);
    toast.error(`Removed ${itemTitle || 'item'} from cart`, {
      ...toastConfig,
      icon: "×",
    });
  };

  const handleQuantityUpdate = (itemId, newQuantity, itemTitle) => {
    if (newQuantity < 1) return;
    
    updateQuantity(itemId, newQuantity);
    toast.success(`Updated ${itemTitle || 'item'} quantity to ${newQuantity}`, {
      ...toastConfig,
      icon: "✓",
    });
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code", {
        ...toastConfig,
        icon: "!",
      });
      return;
    }
    
    toast.info("Processing coupon code...", {
      ...toastConfig,
      icon: "⌛",
    });
    
    // Simulating API call delay
    setTimeout(() => {
      toast.error("Invalid coupon code", {
        ...toastConfig,
        icon: "×",
      });
    }, 1500);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty", {
        ...toastConfig,
        icon: "!",
      });
      return;
    }
    
    toast.success("Proceeding to checkout...", {
      ...toastConfig,
      icon: "→",
    });
    // Add your checkout logic here
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="w-full">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="hidden md:grid grid-cols-6 text-sm font-medium text-gray-700 bg-[#d8f2ed] p-4 rounded-lg mb-4">
              <div className="col-span-2">PRODUCT DETAILS</div>
              <div className="text-center">PRICE</div>
              <div className="text-center">QUANTITY</div>
              <div className="text-center">SHIPPING</div>
              <div className="text-right flex items-center justify-between">
                <span>SUBTOTAL</span>
                <span>ACTION</span>
              </div>
            </div>

            <div className="md:hidden text-sm font-medium text-gray-700 bg-[#d8f2ed] p-4 rounded-lg mb-4">
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
                          onClick={() => handleQuantityUpdate(item?.id, (item?.quantity || 1) - 1, item?.title)}
                          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                          disabled={(item?.quantity || 1) <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center text-black">
                          {item?.quantity || 1}
                        </span>
                        <button
                          onClick={() => handleQuantityUpdate(item?.id, (item?.quantity || 1) + 1, item?.title)}
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
                        onClick={() => handleRemoveFromCart(item?.id, item?.title)}
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
                          onClick={() => handleQuantityUpdate(item?.id, (item?.quantity || 1) - 1, item?.title)}
                          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                          disabled={(item?.quantity || 1) <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center text-black">
                          {item?.quantity || 1}
                        </span>
                        <button
                          onClick={() => handleQuantityUpdate(item?.id, (item?.quantity || 1) + 1, item?.title)}
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
                          onClick={() => handleRemoveFromCart(item?.id, item?.title)}
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
          <div className="bg-[#F8FAFC] w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1380px] mx-auto lg:px-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 py-5">
                  <h3 className="text-base lg:text-xl font-bold text-gray-900">
                    Discount Codes
                  </h3>
                  <p className="text-black">Enter your coupon code if you have one</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      className="flex-1 border rounded-md p-2 text-black"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon Code"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="bg-[#F1FDFB] rounded-lg shadow p-4 md:p-8">
                  <div className="flex justify-between pb-2 text-black">
                    <span>Subtotal</span>
                    <span>${formatPrice(calculateSubTotal())}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-black">Shipping</span>
                    <span className="text-teal-500">FREE</span>
                  </div>
                  <div className="flex justify-between font-bold py-2 border-b-2 border-black text-black">
                    <span>Grand Total</span>
                    <span>${formatPrice(calculateSubTotal())}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors w-full"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster 
        position="bottom-right"
        expand={true}
        richColors
      />
      <Footer />
    </div>
  );
};

export default CartClient;