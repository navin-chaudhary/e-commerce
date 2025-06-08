"use client";
<<<<<<< HEAD
import React from "react";
import { useCart } from "../context/CartContext";
import { Toaster, toast } from "sonner";
import { Heart, ShoppingBag, AlertCircle } from "lucide-react";
import Footer from "../../components/custom/Footer";
import Image from "next/image";
import Navbar from "@/components/custom/Navbar";
=======
import React from 'react';
import { useCart } from '../context/CartContext';
import { Toaster, toast } from 'sonner';
import { Heart, ShoppingBag, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col h-full transition-transform transform hover:scale-[1.02]">
        <div className="relative pt-[75%] bg-gray-200 rounded-t-xl" />
        <div className="p-4 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
          <div className="h-8 bg-gray-200 rounded" />
          <div className="flex gap-2">
            <div className="h-10 bg-gray-200 rounded flex-1" />
            <div className="h-10 bg-gray-200 rounded flex-1" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const FavoriteItem = ({ item, onRemove }) => (
  <div className="group bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
    <div className="relative pt-[75%] bg-gray-50 overflow-hidden rounded-t-xl">
      <Image
        src={item.image}
        alt={item.title}
       fill
        className="absolute top-0 left-0 w-full h-full object-fit object-center transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
      {item.rating && (
        <span className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 rounded-md text-gray-700 backdrop-blur-sm shadow-sm text-sm font-semibold">
          {item.rating.rate} <span className="text-yellow-500 text-lg ml-1">★</span>
        </span>
      )}
      <span className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-sm">
        <Heart className="w-5 h-5 text-red-500" />
      </span>
    </div>

    <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {item.description}
        </p>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold text-gray-900">
            ${item.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </p>
          <span className="line-through font-thin text-gray-400">Rs.{(item.price * 1.81).toFixed(2)}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => onRemove(item)}
            className="flex-1 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label={`Remove ${item.title} from favorites`}
          >
            Remove
          </button>
          {item.inStock && (
            <button
              className="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
              aria-label={`Add ${item.title} to cart`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center space-y-4 min-h-[400px] bg-gray-200 rounded-lg shadow-sm p-4 sm:p-8">
    <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-center">No Favorites Yet</h3>
    <p className="text-sm sm:text-base text-gray-500 text-center max-w-md">
      Start adding items to your favorites list by clicking the heart icon on products you love!
    </p>
  </div>
);
>>>>>>> f83fca713b9320355823cd59c89a963b88610e9e

const Favorites = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const { favorites, removeFromFavorites } = useCart();
<<<<<<< HEAD

=======
  
>>>>>>> f83fca713b9320355823cd59c89a963b88610e9e
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRemoveFromFavorites = (product) => {
    removeFromFavorites(product.id);
    toast.success("Removed from favorites", {
      className: "bg-black text-white font-bold text-lg",
      duration: 2000,
      icon: "✅",
    });
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar />
=======
    <div className="min-h-screen flex flex-col bg-gradient-to-b bg-white">
      <Navbar />
      
>>>>>>> f83fca713b9320355823cd59c89a963b88610e9e
      <main className="flex-grow container max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <header className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Your Favorites
          </h1>
          {!isLoading && (
            <p className="mt-2 text-gray-600">
<<<<<<< HEAD
              {favorites.length} {favorites.length === 1 ? "item" : "items"}
            </p>
          )}
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md border border-gray-100 p-4 flex flex-col h-full transition-transform transform hover:scale-[1.02]"
              >
                <div className="relative pt-[75%] bg-gray-200 rounded-t-lg" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </div>
                  <div className="h-8 bg-gray-200 rounded" />
                  <div className="flex gap-2">
                    <div className="h-10 bg-gray-200 rounded flex-1" />
                    <div className="h-10 bg-gray-200 rounded flex-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 min-h-[400px] bg-white rounded-lg shadow-md p-4 sm:p-8">
            <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-center">
              No Favorites Yet
            </h3>
            <p className="text-sm sm:text-base text-gray-500 text-center max-w-md">
              Start adding items to your favorites list by clicking the heart
              icon on products you love!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md border border-gray-100 p-4 flex flex-col h-full transition-transform transform hover:scale-[1.02]"
              >
                <div className="relative pt-[75%] bg-gray-50 overflow-hidden rounded-t-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="absolute top-0 left-0 w-full h-full object-fit object-center transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {item.rating && (
                    <span className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 rounded-md text-gray-700 backdrop-blur-sm shadow-sm text-sm font-semibold">
                      {item.rating.rate}{" "}
                      <span className="text-yellow-500 text-lg ml-1">★</span>
                    </span>
                  )}
                  <span className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-sm">
                    <Heart className="w-5 h-5 text-red-500" />
                  </span>
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-gray-900">
                        ${item.price.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <span className="line-through font-thin text-gray-400">
                        Rs.{(item.price * 1.81).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleRemoveFromFavorites(item)}
                        className="flex-1 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-label={`Remove ${item.title} from favorites`}
                      >
                        Remove
                      </button>
                      {item.inStock && (
                        <button
                          className="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                          aria-label={`Add ${item.title} to cart`}
                        >
                          <ShoppingBag className="w-5 h-5" />
                          <span className="hidden sm:inline">Add to Cart</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
=======
              {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
            </p>
          )}
        </header>
        
        {isLoading ? (
          <LoadingSkeleton />
        ) : favorites.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {favorites.map((item) => (
              <FavoriteItem 
                key={item.id}
                item={item}
                onRemove={handleRemoveFromFavorites}
              />
>>>>>>> f83fca713b9320355823cd59c89a963b88610e9e
            ))}
          </div>
        )}
      </main>
<<<<<<< HEAD

=======
      
>>>>>>> f83fca713b9320355823cd59c89a963b88610e9e
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Favorites;
