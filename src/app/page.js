<<<<<<< HEAD
import PopularBrands from "@/components/custom/Brands";
import PopularCategories from "@/components/custom/Categories";
import FAQ from "@/components/custom/Faq";
import Footer from "@/components/custom/Footer";
import HomePage from "@/components/custom/Homepage";
import Navbar from "@/components/custom/Navbar";
import PopularProducts from "@/components/custom/PopularProducts";
import ServicesFeatures from "@/components/custom/Servies";


=======

import Navbar from "./components/Navbar";
import HomePage from "./components/Homepage";
import Categoriespage from "./components/Categories";
import ServicesFeatures from "./components/Servies";
import PopularProducts from "./components/PopularProducts";
import PopularBrands from "./components/Brands";
import FAQ from "./components/Faq";
import Footer from "./components/Footer";
>>>>>>> f83fca713b9320355823cd59c89a963b88610e9e

export default function Home() {
  return (
    <>
    <Navbar/>
    <HomePage/>
<<<<<<< HEAD
    <PopularCategories/>
=======
    <Categoriespage/>
>>>>>>> f83fca713b9320355823cd59c89a963b88610e9e
    <PopularProducts/>
    <ServicesFeatures/>
    <PopularBrands/>
    <FAQ/>
    <Footer/>
    </>
  );
}