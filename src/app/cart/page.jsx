"use client";
import React, { useState } from "react";
import { Minus, Plus, Trash2, Tag, X } from "lucide-react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import Footer from "../../components/custom/Footer";
import { Toaster, toast } from 'sonner';
import Navbar from "../components/Navbar";
import getStripe from "../../lib/stripe-client.js";

const CartClient = () => {
  const { cartItems = [], removeFromCart, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isCouponLoading, setIsCouponLoading] = useState(false);

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

  const calculateFinalTotal = () => {
    const subtotal = calculateSubTotal();
    return Math.max(0, subtotal - discountAmount);
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

    // Revalidate coupon if applied
    if (appliedCoupon) {
      validateCouponCode(appliedCoupon, true);
    }
  };

  const validateCouponCode = async (code = couponCode, silent = false) => {
    if (!code.trim()) {
      if (!silent) {
        toast.error("Please enter a coupon code", {
          ...toastConfig,
          icon: "!",
        });
      }
      return;
    }

    const subtotal = calculateSubTotal();
    if (subtotal <= 0) {
      if (!silent) {
        toast.error("Add items to cart before applying coupon", {
          ...toastConfig,
          icon: "!",
        });
      }
      return;
    }

    setIsCouponLoading(true);
    
    try {
      const response = await fetch('/api/validate-coupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          couponCode: code,
          subtotal: subtotal
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAppliedCoupon(data.couponCode);
        setDiscountAmount(data.discountAmount);
        setCouponCode("");
        
        if (!silent) {
          toast.success(`Coupon applied! Saved $${data.discountAmount.toFixed(2)}`, {
            ...toastConfig,
            icon: "🎉",
          });
        }
      } else {
        if (!silent) {
          toast.error(data.error || "Invalid coupon code", {
            ...toastConfig,
            icon: "×",
          });
        }
        // Reset discount if validation fails
        if (silent) {
          setAppliedCoupon(null);
          setDiscountAmount(0);
        }
      }
    } catch (error) {
      console.error('Coupon validation error:', error);
      if (!silent) {
        toast.error("Failed to validate coupon code", {
          ...toastConfig,
          icon: "×",
        });
      }
    } finally {
      setIsCouponLoading(false);
    }
  };

  const handleApplyCoupon = () => {
    validateCouponCode();
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode("");
    
    toast.info("Coupon removed", {
      ...toastConfig,
      icon: "ℹ",
    });
  };
  const debugCartData = () => {
  console.log('=== CART DEBUG INFO ===');
  cartItems.forEach((item, index) => {
    console.log(`Item ${index + 1}:`, {
      id: item.id,
      title: item.title,
      price: item.price,
      priceType: typeof item.price,
      quantity: item.quantity,
      quantityType: typeof item.quantity,
      isValidPrice: !isNaN(parseFloat(item.price)) && parseFloat(item.price) > 0,
      isValidQuantity: !isNaN(parseInt(item.quantity)) && parseInt(item.quantity) > 0,
    });
  });
  
  console.log('Subtotal:', calculateSubTotal());
  console.log('Applied coupon:', appliedCoupon);
  console.log('Discount amount:', discountAmount);
  console.log('Final total:', calculateFinalTotal());
  console.log('=== END DEBUG INFO ===');
};

 const handleCheckout = async () => {
   debugCartData();
  if (cartItems.length === 0) {
    toast.error("Your cart is empty", {
      ...toastConfig,
      icon: "!",
    });
    return;
  }

  setIsCheckoutLoading(true);
  
  try {
    console.log('=== CHECKOUT DEBUG START ===');
    console.log('Cart items:', cartItems);
    console.log('Applied coupon:', appliedCoupon);
    console.log('Discount amount:', discountAmount);
    console.log('Subtotal:', calculateSubTotal());
    console.log('Final total:', calculateFinalTotal());

    // Validate cart items before sending
    const validItems = cartItems.filter(item => {
      const isValid = item && 
                     item.title && 
                     item.price && 
                     item.price > 0 && 
                     item.quantity && 
                     item.quantity > 0;
      
      if (!isValid) {
        console.error('Invalid item found:', item);
      }
      
      return isValid;
    });

    console.log('Valid items:', validItems.length, 'of', cartItems.length);

    if (validItems.length === 0) {
      throw new Error('No valid items in cart');
    }

    toast.info("Preparing checkout...", {
      ...toastConfig,
      icon: "⌛",
    });

    // Prepare request payload
    const payload = {
      items: validItems.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        price: Number(item.price),
        quantity: Number(item.quantity),
        image: item.image || ''
      })),
      couponCode: appliedCoupon || ''
    };

    console.log('Sending payload:', payload);

    // Create checkout session
    const response = await fetch('/api/checkout-simple-fix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      console.error('Checkout API error:', data);
      throw new Error(data.error || `HTTP ${response.status}: ${data.details || 'Unknown error'}`);
    }

    if (!data.sessionId) {
      throw new Error('No session ID received from server');
    }

    console.log('Redirecting to Stripe with session ID:', data.sessionId);

    // Redirect to Stripe Checkout
    const stripe = await getStripe();
    
    if (!stripe) {
      throw new Error('Failed to load Stripe');
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });

    if (error) {
      console.error('Stripe redirect error:', error);
      throw new Error(`Stripe error: ${error.message}`);
    }

  } catch (error) {
    console.error('=== CHECKOUT ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.log('=== CHECKOUT DEBUG END ===');
    
    toast.error(error.message || "Checkout failed. Please try again.", {
      ...toastConfig,
      icon: "×",
    });
  } finally {
    setIsCheckoutLoading(false);
  }
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
                  
                  {/* Applied Coupon Display */}
                  {appliedCoupon && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-green-800 font-medium">{appliedCoupon}</span>
                          <span className="text-green-600 ml-2">(-${formatPrice(discountAmount)})</span>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-green-600 hover:text-green-800"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Coupon Input */}
                  {!appliedCoupon && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        className="flex-1 border rounded-md p-2 text-black uppercase"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Enter coupon code (e.g., WELCOME10)"
                        disabled={isCouponLoading}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={isCouponLoading || !couponCode.trim()}
                        className={`px-4 py-2 rounded-md transition-colors ${
                          isCouponLoading || !couponCode.trim()
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-teal-500 hover:bg-teal-600'
                        } text-white`}
                      >
                        {isCouponLoading ? 'Checking...' : 'Apply'}
                      </button>
                    </div>
                  )}

                  {/* Available Coupons Hint */}
                  <div className="text-sm text-gray-600 mt-2">
                    <p className="font-medium mb-1">Try these codes:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">WELCOME10</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">SAVE20</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">FLAT15</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F1FDFB] rounded-lg shadow p-4 md:p-8">
                  <div className="flex justify-between pb-2 text-black">
                    <span>Subtotal</span>
                    <span>${formatPrice(calculateSubTotal())}</span>
                  </div>
                  
                  {appliedCoupon && discountAmount > 0 && (
                    <div className="flex justify-between py-2 text-green-600">
                      <span>Discount ({appliedCoupon})</span>
                      <span>-${formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-2">
                    <span className="text-black">Shipping</span>
                    <span className="text-teal-500">FREE</span>
                  </div>
                  
                  <div className="flex justify-between font-bold py-2 border-b-2 border-black text-black">
                    <span>Grand Total</span>
                    <span>${formatPrice(calculateFinalTotal())}</span>
                  </div>
                  
                  {appliedCoupon && discountAmount > 0 && (
                    <div className="text-center text-green-600 text-sm mt-2">
                      You saved ${formatPrice(discountAmount)} with {appliedCoupon}!
                    </div>
                  )}
                  
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckoutLoading}
                    className={`mt-4 px-4 py-2 rounded-md w-full transition-colors ${
                      isCheckoutLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-teal-500 hover:bg-teal-600'
                    } text-white`}
                  >
                    {isCheckoutLoading ? 'Processing...' : 'Proceed to Checkout'}
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