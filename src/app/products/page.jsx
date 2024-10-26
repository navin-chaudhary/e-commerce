"use client";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products. Please try again later.");
        }
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.price - b.price);
        setProducts(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    try {
      if (!product) return;

      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: 1,
        rating: product.rating
      };

      addToCart(cartItem);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const ProductSkeleton = () => (
    <div className="border border-gray-300 rounded-xl shadow-md overflow-hidden animate-pulse bg-white">
      <div className="w-full h-72 bg-gray-200" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div className="border border-gray-300 rounded-xl shadow-md overflow-hidden relative bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-72">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform duration-300 transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {product.rating && (
          <span className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-md text-gray-600 backdrop-blur-sm">
            {product.rating.rate}
            <span className="text-yellow-500 text-xl ml-1">★</span>
          </span>
        )}
        <button 
          className="absolute top-2 right-2 p-2 bg-white/90 rounded-full border hover:bg-gray-100 transition-colors duration-200 backdrop-blur-sm"
          aria-label="Add to favorites"
        >
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1 text-black line-clamp-1" title={product.title}>
          {product.title}
        </h3>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2" title={product.description}>
          {product.description}
        </p>

        <div className="flex flex-wrap gap-2 text-lg font-bold my-2">
          <span>Rs.{product.price?.toFixed(2)}</span>
          <span className="line-through font-thin text-gray-400">Rs.{(product.price * 1.81).toFixed(2)}</span>
          <span className="text-red-600 font-thin">(81% off)</span>
        </div>
        
        <button 
          onClick={() => handleAddToCart(product)}
          className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded 
                   hover:bg-teal-600 transition-colors duration-200 
                   focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="py-12 bg-gray-50 text-black px-4 sm:px-8 lg:px-20 min-h-screen">
        <div className="flex justify-between items-center mb-8 lg:mt-8">
          <h1 className="text-xl lg:text-4xl font-bold">Products</h1>
          <Link
            href="/products"
            className="bg-teal-500 h-10 md:h-12 px-4 pt-3 lg:px-16 sm:px-8 text-white font-bold rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 hover:bg-teal-600 transition-colors duration-200"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="text-red-500 mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Products;