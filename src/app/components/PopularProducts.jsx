"use client";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext"; 
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'; 

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.price - b.price);
        setProducts(sortedData.slice(0, 8));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const handleAddToCart = (product) => {
    toast.success("Added to Cart!", {
      position: "bottom-right",
      autoClose: 1000,  
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: "#14B8A6",
        color: "black",
        fontWeight: "bold",
      },
      icon: "🛒",
    });
    if (!product) return;
    
    
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1, 
      description: product.description,
      rating: product.rating
    };
    
    addToCart(cartItem);
  };

  return (
    <div className="py-12 bg-[#eff1f2] text-black px-4 sm:px-8 lg:px-20">
      <div className="flex justify-between items-center mb-8 lg:mt-8">
        <h2 className="text-xl lg:text-4xl font-bold">Most Popular Products</h2>
        <Link
          href="/products"
          className="bg-[#14B8A6] h-10 md:h-12 px-4 pt-3 lg:px-16 sm:px-8 text-white font-bold rounded focus:outline-none focus:shadow-outline"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
           key={product.id}
          className="border border-gray-300 rounded-xl shadow-md overflow-hidden relative bg-white hover:shadow-lg transition-shadow duration-300">
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
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;