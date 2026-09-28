import Hero from "@/components/Hero";
import CategoryTiles from "@/components/CategoryTiles";
import Products from "@/components/Products";
import Heritage from "@/components/Heritage";
import Lookbook from "@/components/Lookbook";
import Testimonials from "@/components/Testimonials";
import Journal from "@/components/Journal";
import Services from "@/components/Services";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <CategoryTiles />
      <Products />
      <Heritage />
      <Lookbook />
      <Testimonials />
      <Journal />
      <Newsletter />
    </>
  );
}
