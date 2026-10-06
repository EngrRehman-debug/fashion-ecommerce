import Hero from "@/components/Hero";
import CategoryTiles from "@/components/CategoryTiles";
import WomenCollection from "@/components/WomenCollection";
import Products from "@/components/Products";
import Heritage from "@/components/Heritage";
import Lookbook from "@/components/Lookbook";
import Testimonials from "@/components/Testimonials";
import Journal from "@/components/Journal";
import Newsletter from "@/components/Newsletter";
import { initLocale, type LocaleParams } from "@/lib/i18n/server";

export default async function Home({ params }: LocaleParams) {
  await initLocale(params);
  return (
    <>
      <Hero />
      <CategoryTiles />
      <WomenCollection />
      <Products />
      <Heritage />
      <Lookbook />
      <Testimonials />
      <Journal />
      <Newsletter />
    </>
  );
}
