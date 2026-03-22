import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ServiceCard from "../components/services/ServiceCard";
import FilterBar from "../components/services/FilterBar";
import API from "../api/api";

export default function Services() {
  const [selected, setSelected] = useState("All");
  const [services, setServices] = useState([]);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await API.get("services/");
      setServices(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const categories = [...new Set(services.map(s => s.category.name))];

  const filtered =
    selected === "All"
      ? services
      : services.filter(s => s.category.name === selected);

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
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}