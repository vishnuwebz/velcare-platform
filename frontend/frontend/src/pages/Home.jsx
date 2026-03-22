import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import ServicesStrip from "../components/home/ServicesStrip";
import Categories from "../components/home/Categories";
import HowItWorks from "../components/home/HowItWorks";
import FeaturedServices from "../components/home/FeaturedServices";
import Testimonials from "../components/home/Testimonials";
import CTABanner from "../components/home/CTABanner";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="page active">
        <Hero />
        <ServicesStrip />
        <Categories />
        <HowItWorks />
        <FeaturedServices />
        <Testimonials />
        <CTABanner />
        <Footer />
      </div>
    </>
  );
}