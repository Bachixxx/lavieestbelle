import { AboutPreview } from "@/components/sections/AboutPreview";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <AboutPreview />
      <Testimonials />
    </>
  );
}
