"use client";

import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import Image from "next/image";
import { 
  signInWithGoogle, 
  loginWithEmail, 
  registerWithEmail,
  initializeFirebase,
  
} from "../utils/firebase";
// import { initializeFirebase } from "../utils/initializeFirebase";
const LoginPage = () => {
  const [loadingEmailAuth, setLoadingEmailAuth] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      // Initialize Firebase when component mounts
      initializeFirebase();
      console.log("Firebase initialized successfully");
      
      // Check for existing user
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          console.log("Found stored user:", storedUser);
        }
      }
    } catch (error) {
      console.error("Firebase initialization error:", error);
      toast.error("Error initializing authentication service");
    }
  }, []);

  const handleGoogleLogin = async () => {
    console.log("Starting Google login process...");
    try {
      setLoadingGoogle(true);
      const result = await signInWithGoogle();
      console.log("Google login result:", result);

      if (result?.success) {
        setUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success(`Welcome, ${result.user.displayName || "user"}!`);
        router.push("/");
      } else {
        console.error("Google login failed:", result?.error);
        toast.error(`Login failed: ${result?.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error?.message || "Failed to login with Google");
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleEmailAuth = async () => {
    console.log("Starting email auth process...");
    console.log("Mode:", isRegistering ? "register" : "login");
    
    // Validation
    if (isRegistering && !username) {
      toast.error("Please enter a username.");
      return;
    }
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoadingEmailAuth(true);
      const result = isRegistering
        ? await registerWithEmail(email, password, username)
        : await loginWithEmail(email, password);

      console.log("Email auth result:", result);

      if (result?.success) {
        setUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        const message = isRegistering
          ? `Account created for ${result.user.email}!`
          : `Welcome back, ${result.user.email}!`;
        toast.success(message);
        router.push("/");
      } else {
        console.error("Email auth failed:", result?.error);
        toast.error(result?.error || "Authentication failed");
      }
    } catch (error) {
      console.error("Email auth error:", error);
      toast.error(error?.message || "Authentication failed");
    } finally {
      setLoadingEmailAuth(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto border p-5 border-gray-400 rounded-md space-y-8 shadow-lg bg-gray-50">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            {isRegistering ? "Create New Account" : "Login"}
          </h2>
          <div className="space-y-6">
            {isRegistering && (
              <div className="relative flex items-center">
                <div className="absolute left-0 z-30 flex items-center pl-2 text-gray-500">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full rounded-lg border border-gray-300 bg-white px-7 pb-2 pt-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            )}
            <div className="relative flex items-center">
              <div className="absolute left-0 z-30 flex items-center pl-2 text-gray-500">
                <Mail size={20} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-lg border border-gray-300 bg-white px-8 pb-2 pt-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="relative flex items-center">
              <div className="absolute left-0 z-30 flex items-center pl-2 text-gray-500">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-lg border border-gray-300 bg-white px-8 pb-2 pt-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 z-20 flex items-center pr-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="button"
              onClick={handleEmailAuth}
              disabled={loadingEmailAuth}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm rounded-lg text-white font-bold bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
            >
              {loadingEmailAuth ? (
                isRegistering ? "Creating Account..." : "Signing In..."
              ) : isRegistering ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </button>
            <div className="flex items-center justify-center space-x-2">
              <hr className="flex-grow border-gray-400 border-t" />
              <span className="text-gray-500">or</span>
              <hr className="flex-grow border-gray-400 border-t" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loadingGoogle}
              className="group relative w-full flex justify-center font-bold items-center py-2 px-4 border border-gray-300 text-sm rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <Image
                src="/images/google-icon.png"
                alt="Google"
                width={1000}
                height={1000}
                className="w-5 h-5 mr-2"
              />
              {loadingGoogle ? "Signing in..." : "Continue with Google"}
            </button>

            <p className="mt-6 text-center text-sm text-gray-600">
              {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {isRegistering ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
      </main>
      <Toaster position="bottom-right" />
      <Footer />
    </div>
  );
};

export default LoginPage;
