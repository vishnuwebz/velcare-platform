import { useState } from "react";
import Navbar from "../components/Navbar";
import ServiceCard from "../components/services/ServiceCard";
import FilterBar from "../components/services/FilterBar";

export default function Services() {
  const [selected, setSelected] = useState("All");

  const services = [
    {
      name: "Basic Wash",
      category: "Wash",
      price: 499,
      features: ["Exterior wash", "Quick dry"]
    },
    {
      name: "Interior Cleaning",
      category: "Cleaning",
      price: 999,
      features: ["Vacuum", "Dashboard polish"]
    },
    {
      name: "Full Detailing",
      category: "Detailing",
      price: 1999,
      features: ["Interior + Exterior", "Wax polish"]
    },
    {
      name: "Ceramic Coating",
      category: "Protection",
      price: 4999,
      features: ["Paint protection", "Gloss finish"]
    }
  ];

  const categories = [...new Set(services.map(s => s.category))];

  const filtered =
    selected === "All"
      ? services
      : services.filter(s => s.category === selected);

  return (
    <>
      <Navbar />

      <div className="page active">
        <div className="services-hero">
          <div className="container">
            <h1 className="section-title">Our Services</h1>

            <FilterBar
              categories={categories}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </div>

        <div className="services-grid-section container">
          <div className="grid-3">
            {filtered.map((service, i) => (
              <ServiceCard key={i} service={service} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}