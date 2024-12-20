'use client'
import React, { useState,useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, User, Heart } from "lucide-react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Assuming you're using react-toastify
import { logoutUser } from "../auth/utils/firebase";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { cartItems, getFavoritesCount } = useCart();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const cartItemCount =
    cartItems?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;
  const favoriteCount = getFavoritesCount();
  
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    }
    checkUser();
    window.addEventListener('focus', checkUser);
    
    return () => {
      window.removeEventListener('focus', checkUser);
    };
  }, []);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLogoutModal = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    try {
      setIsLoggingOut(true);
      const result = await logoutUser();
      
      if (result.success) {
        setUser(null);
        toast.success("Logged out successfully");
        
        // Force a full page refresh and redirect to home
        window.location.href = "/";
      } else {
        toast.error("Logout failed: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout: " + (error.message || "Unknown error"));
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getLinkClassName = (path) =>
    `${
      pathname === path
        ? "text-teal-500 uppercase font-bold"
        : "text-white uppercase font-bold"
    } 
      transition-colors duration-200 hover:text-teal-500`;

  const getIconLinkClassName = (path) =>
    `${
      pathname === path
        ? "bg-teal-500 text-white"
        : "bg-gray-200 text-gray-600 hover:text-teal-500"
    } 
      p-2 rounded-md relative transition-all duration-200 transform`;

  const handleCartClick = () => {
    if (!user) {
      toast.info("Please login first to view your cart.");
      router.push("/auth/login");
    }
  };

  return (
    <nav className="bg-white z-50 py-1 sticky top-0 shadow-sm">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 group">
            <Link
              href="/"
              className="flex items-center bg-black p-3 h-[47px] md:h-[59px] rounded-md"
            >
              <span className="text-yellow-500 text-2xl font-extrabold w-[100px] transition-transform duration-300 group-hover:scale-105">
                E-SHOP
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 bg-black w-full mx-3 p-3 h-[58px] rounded-md justify-start">
            <Link href="/" className={getLinkClassName("/")}>
              Home
            </Link>
            <Link href="/products" className={getLinkClassName("/products")}>
              Shop
            </Link>
            <Link href="/blog" className={getLinkClassName("/blog")}>
              Blog
            </Link>
            <Link href="/contact" className={getLinkClassName("/contact")}>
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4 bg-black p-3 rounded-lg relative">
            {user ? (
              <div className="relative group flex items-center space-x-4">
                {user.photoURL ? (
                  <div
                    onClick={toggleLogoutModal}
                    className="rounded-md cursor-pointer h-8 w-8"
                  >
                    <Image
                      src={user.photoURL}
                      alt="User Profile"
                      width={80}
                      height={100}
                      className="rounded-md "
                    />
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className={getIconLinkClassName("/login")}
                  >
                    <User className="h-5 w-5" />
                  </Link>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className={getIconLinkClassName("/login")}>
                <User className="h-5 w-5" />
              </Link>
            )}

            <Link
              href="/favorite"
              className={getIconLinkClassName("/favorite")}
            >
              <Heart className="h-5 w-5" />
              {favoriteCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favoriteCount}
                </div>
              )}
            </Link>

            <button onClick={handleCartClick} className={getIconLinkClassName("/cart")}>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </div>
                )}
              </Link>
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-yellow-600 text-xl bg-black p-3 rounded-md transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out rounded-md fixed top-[70px] left-[3%] w-[93%] ${
            isMenuOpen
              ? "max-h-screen opacity-100 bg-black z-40"
              : "max-h-0 opacity-0 overflow-hidden z-30"
          }`}
        >
          <div className="px-2 flex flex-col pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className={getLinkClassName("/")}>
              Home
            </Link>
            <Link href="/products" className={getLinkClassName("/products")}>
              Shop
            </Link>
            <Link href="/blog" className={getLinkClassName("/blog")}>
              Blog
            </Link>
            <Link href="/contact" className={getLinkClassName("/contact")}>
              Contact
            </Link>
          </div>
          <div className="flex gap-8 p-3">
            {user ? (
              <div className="h-full">
                {user.photoURL ? (
                  <div
                    onClick={toggleLogoutModal}
                    className="rounded-md cursor-pointer"
                  >
                    <Image
                      src={user.photoURL}
                      alt="User Profile"
                      width={40}
                      height={37}
                      className="rounded-md"
                    />
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className={getIconLinkClassName("/login")}
                  >
                    <User className="h-5 w-5" />
                  </Link>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className={getIconLinkClassName("/login")}>
                <User className="h-5 w-5" />
              </Link>
            )}
            <Link href="/favorite" className={getIconLinkClassName("/favorite")}>
              <Heart className="h-5 w-5" />
            </Link>
            <button onClick={handleCartClick} className={getIconLinkClassName("/cart")}>
              <Link href="/cart">
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

        {isLogoutModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className=" p-6 mx-3 rounded-md shadow-lg w-full max-w-md bg-white">
              <h3 className="text-lg font-medium mb-4 text-black">
                Logout Confirmation
              </h3>
              <p className="mb-4 text-black">
                Are you sure you want to log out?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={toggleLogoutModal}
                  className="bg-[#232222] hover:bg-black text-white hover:text-white font-bold px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
