import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import ServicesStrip from "../components/home/ServicesStrip";
import Categories from "../components/home/Categories";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="page active">
        <Hero />
        <ServicesStrip />
        <Categories />
      </div>
    </>
  );
}