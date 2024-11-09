
import Navbar from "./components/Navbar";
import HomePage from "./components/Homepage";
import Categoriespage from "./components/Categories";
import ServicesFeatures from "./components/Servies";
import PopularProducts from "./components/PopularProducts";
import PopularBrands from "./components/Brands";
import FAQ from "./components/Faq";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
    <Navbar/>
    <HomePage/>
    <Categoriespage/>
    <PopularProducts/>
    <ServicesFeatures/>
    <PopularBrands/>
    <FAQ/>
    <Footer/>
    </>
  );
}