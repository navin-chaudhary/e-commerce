import Image from "next/image";
import Navbar from "./components/Navbar";
import HomePage from "./components/Homepage";
import Statespage from "./components/States";
import Categoriespage from "./components/Categories";
import FeaturesProducts from "./components/FeatureProduct";
import ServicesFeatures from "./components/Servies";
import PromoBanner from "./components/Banner";
import PopularProducts from "./components/PopularProducts";
import PopularBrands from "./components/Brands";
import FAQ from "./components/Faq";
import CustomerReviews from "./components/CustomerReview";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
    <Navbar/>
    <HomePage/>
    <Statespage/>
    <Categoriespage/>
    <FeaturesProducts/>
    <ServicesFeatures/>
    <PromoBanner/>
    <PopularProducts/>
    <PopularBrands/>
    <FAQ/>
    <CustomerReviews/>
    <Footer/>
    </>
  );
}
