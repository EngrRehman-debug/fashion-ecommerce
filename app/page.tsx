import Hero from "@/components/Hero";
import CategoryTiles from "@/components/CategoryTiles";
import Products from "@/components/Products";
import Heritage from "@/components/Heritage";
import Lookbook from "@/components/Lookbook";
import Testimonials from "@/components/Testimonials";
import Journal from "@/components/Journal";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
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
